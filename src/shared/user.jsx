import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useSessionStorage } from "react-use";
import supabase from "@/shared/supabase";

const defaultUser = {
  // persisted/profile-ish
  userId: null,
  uid: null,
  username: null,
  part: null,
  group: null,
  isAdmin: false,
  hasNewNotes: false,

  fullname: null,
  engname: null,
  birthday: null,
  nationality: null,
  gen: null,
  height: null,
  age: null,

  // ✅ 추가: 인증 모드 (supabase 세션 / fake 로그인 / null)
  authMode: null, // "supabase" | "fake" | null

  // runtime
  bootstrapped: false,
  isLoggedIn: false,
  isAuthenticated: false,

  // actions
  login: async (part, userId, password) => {},
  loginWithoutAuth: async (part, userId, password) => {},
  logout: async () => {},
  clearNewNotes: () => {},
};

const UserContext = createContext(defaultUser);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useSessionStorage("user", defaultUser);
  const [session, setSession] = useState(null);

  const fetchAndStoreProfile = async (uid, prevUserId = null) => {
    const { data: profileData, error: profileError } = await supabase
      .from("members")
      .select(
        `
        username, role, fullname, engname, birthday, nationality, gen, age, height,
        groups ( id, group_name, color, border_color, order_index )
      `
      )
      .eq("id", uid)
      .single();

    if (profileError || !profileData) return;

    setUserData((prev) => ({
      ...prev,
      uid,
      authMode: "supabase",

      userId: prev.userId ?? prevUserId ?? prev.userId,

      username: profileData.username ?? prev.username,
      part: profileData.groups?.group_name ?? prev.part,
      group: profileData.groups ?? prev.group,

      fullname: profileData.fullname ?? prev.fullname,
      engname: profileData.engname ?? prev.engname,
      birthday: profileData.birthday ?? prev.birthday,
      nationality: profileData.nationality ?? prev.nationality,
      gen: profileData.gen ?? prev.gen,
      height: profileData.height ?? prev.height,
      age: profileData.age ?? prev.age,

      isAdmin: profileData.role === "admin",
      bootstrapped: true,
    }));
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      const nextSession = data?.session ?? null;
      const uid = nextSession?.user?.id ?? null;

      setSession(nextSession);

      // ✅ 세션 있으면 supabase 모드로, 없으면 기존 userData(fake 유지 가능)
      setUserData((prev) => ({
        ...prev,
        uid: uid ?? null,
        authMode: uid ? "supabase" : prev.authMode, // fake 로그인 유지
        bootstrapped: true,
      }));

      // 세션이 있는데 프로필 비어있으면 복원
      if (uid) {
        setUserData((prev) => {
          const needProfile = !prev.username || !prev.part || !prev.group;
          if (needProfile) fetchAndStoreProfile(uid, prev.userId);
          return prev;
        });
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;

      setSession(newSession ?? null);

      if (!newSession) {
        // ✅ 세션 로그아웃되더라도, fake 로그인까지 같이 날리는 게 “완전 로그아웃” 느낌
        setUserData({ ...defaultUser, bootstrapped: true });
        return;
      }

      const uid = newSession.user?.id ?? null;

      setUserData((prev) => ({
        ...prev,
        uid: uid ?? prev.uid,
        authMode: "supabase",
        bootstrapped: true,
      }));

      if (uid) {
        setUserData((prev) => {
          const needProfile = !prev.username || !prev.part || !prev.group;
          if (needProfile) fetchAndStoreProfile(uid, prev.userId);
          return prev;
        });
      }
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [setUserData]);

  const user = useMemo(() => {
    const isAuthed = !!session?.user?.id;

    // ✅ 세션 OR fake 로그인 모드면 로그인처럼 취급
    const isFake = userData.authMode === "fake";
    const isLoggedIn = isAuthed || isFake;

    return {
      ...userData,
      isLoggedIn,
      isAuthenticated: isAuthed,

      login: async (part, userId, password) => {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: `${userId}@union-1002.com`,
          password,
        });

        if (authError || !authData?.user) {
          throw new Error("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
        }

        const { data: profileData, error: profileError } = await supabase
          .from("members")
          .select(
            `
            username, role, fullname, engname, birthday, nationality, gen, age, height,
            groups ( id, group_name, color, border_color, order_index )
          `
          )
          .eq("id", authData.user.id)
          .single();

        if (profileError || !profileData) {
          await supabase.auth.signOut();
          throw new Error("사용자 정보를 불러오지 못했습니다.");
        }

        if (profileData.groups?.group_name !== part) {
          await supabase.auth.signOut();
          throw new Error("선택한 부서가 일치하지 않습니다.");
        }

        setUserData({
          ...defaultUser,
          bootstrapped: true,
          authMode: "supabase",

          userId,
          uid: authData.user.id,

          username: profileData.username,
          part,
          group: profileData.groups,

          fullname: profileData.fullname,
          engname: profileData.engname,
          birthday: profileData.birthday,
          nationality: profileData.nationality,
          gen: profileData.gen,
          height: profileData.height,
          age: profileData.age,

          isAdmin: profileData.role === "admin",
          hasNewNotes: true,
        });
      },

      // ✅ fake 로그인
      loginWithoutAuth: async (part, userId, _password) => {
        setUserData({
          ...defaultUser,
          bootstrapped: true,
          authMode: "fake",

          userId,
          uid: null,

          username: userId, // 화면에 표시할 이름
          part,             // 화면에 표시할 부서명
          group: null,

          isAdmin: false,
          hasNewNotes: true,
        });
      },

      logout: async () => {
        // ✅ 세션 있으면 signOut, 없어도 무조건 스토리지 초기화
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            await supabase.auth.signOut();
          }
        } catch (e) {
          // signOut 실패해도 UI는 로그아웃처럼 보이게 처리
        }
        setUserData({ ...defaultUser, bootstrapped: true });
      },

      clearNewNotes: () => {
        setUserData((prev) => ({ ...prev, hasNewNotes: false }));
      },
    };
  }, [userData, session, setUserData]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
