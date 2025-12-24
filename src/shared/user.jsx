import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useSessionStorage } from "react-use";
import supabase from "@/shared/supabase";

const defaultUser = {
  // persisted/profile-ish
  userId: null, // 로그인 입력 id (email 앞부분)
  uid: null, // supabase auth user id (uuid)
  username: null,
  part: null, // 부서명(문자열)
  group: null, // groups row object
  isAdmin: false,
  hasNewNotes: false,

  fullname: null,
  engname: null,
  birthday: null,
  nationality: null,
  gen: null,
  height: null,
  age: null,

  // runtime
  bootstrapped: false, // ✅ 세션 확인 완료 여부
  isLoggedIn: false, // ✅ session 기준 계산
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
  const [session, setSession] = useState(null); // ✅ Supabase session이 truth source

  // ✅ members 프로필을 다시 불러와 userData를 복원 (새로고침/새탭 대응)
  const fetchAndStoreProfile = async (uid, prevUserId = null) => {
    const { data: profileData, error: profileError } = await supabase
      .from("members")
      .select(
        `
        username, role, fullname, engname, birthday, nationality, gen, age, height,
        groups ( id, group_name, color, border_color, order_index )
      `
      )
      .eq("id", uid) // ✅ members.id == auth.users.id (UUID) 가정
      .single();

    if (profileError || !profileData) {
      // 세션은 있는데 프로필을 못 가져오면, 로그아웃시키진 말고 그대로 둠
      // console.warn("[profile] fetch error:", profileError);
      return;
    }

    setUserData((prev) => ({
      ...prev,
      uid,

      // userId(로그인 입력값)는 DB에 없으니 있으면 유지
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

  // ✅ 앱 시작 시 세션 확인 + auth state change 구독
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      const nextSession = data?.session ?? null;
      const uid = nextSession?.user?.id ?? null;

      setSession(nextSession);
      setUserData((prev) => ({
        ...prev,
        uid: uid ?? null,
        bootstrapped: true,
      }));

      // 세션이 있는데 프로필(환영문 정보)이 비어있으면 복원
      if (uid) {
        setUserData((prev) => {
          const needProfile = !prev.username || !prev.part || !prev.group;
          if (needProfile) fetchAndStoreProfile(uid);
          return prev;
        });
      }

      // if (error) console.warn("[auth] getSession error:", error);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;

      setSession(newSession ?? null);

      // 로그아웃이면 전체 초기화
      if (!newSession) {
        setUserData({ ...defaultUser, bootstrapped: true });
        return;
      }

      const uid = newSession.user?.id ?? null;

      // 세션이 생겼으면 uid 최신화 + 필요시 프로필 복원
      setUserData((prev) => ({
        ...prev,
        uid: uid ?? prev.uid,
        bootstrapped: true,
      }));

      if (uid) {
        setUserData((prev) => {
          const needProfile = !prev.username || !prev.part || !prev.group;
          if (needProfile) fetchAndStoreProfile(uid);
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
    const isLoggedIn = isAuthed; // ✅ 세션 기준

    return {
      ...userData,
      isLoggedIn,
      isAuthenticated: isAuthed,

      login: async (part, userId, password) => {
        // 1) 로그인
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email: `${userId}@union-1002.com`,
            password,
          });

        if (authError || !authData?.user) {
          throw new Error("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
        }

        // 2) 프로필 조회
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

        // 3) 부서 검증
        if (profileData.groups?.group_name !== part) {
          await supabase.auth.signOut();
          throw new Error("선택한 부서가 일치하지 않습니다.");
        }

        // 4) 저장 (세션은 onAuthStateChange가 동기화해줌)
        setUserData({
          ...defaultUser,
          bootstrapped: true,

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

      // 인증 없는 로그인(세션 X)
      loginWithoutAuth: async (part, userId, _password) => {
        setUserData({
          ...defaultUser,
          bootstrapped: true,

          userId,
          uid: null,

          username: userId,
          part,
          group: null,

          isAdmin: false,
          hasNewNotes: true,
        });
      },

      logout: async () => {
        await supabase.auth.signOut();
        setUserData({ ...defaultUser, bootstrapped: true });
      },

      clearNewNotes: () => {
        setUserData((prev) => ({ ...prev, hasNewNotes: false }));
      },
    };
  }, [userData, session, setUserData]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
