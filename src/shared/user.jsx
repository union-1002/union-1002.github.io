import { createContext, useContext, useMemo } from "react";
import { useSessionStorage } from "react-use";
import supabase from "@/shared/supabase";
import { useEffect } from "react";
import { useState } from "react";

const defaultUser = {
  userId: null,
  uid: null,
  username: null,
  part: null,
  isAdmin: false,
  hasNewNotes: false,
  fullname: null,
  engname: null,
  birthday: null,
  nationality: null,
  gen: null,
  height: null,
  age: null,

  // Calculated fields
  isLoggedIn: false,
  isAuthenticated: false,
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
  const [userData, setUserData] = useSessionStorage('user', defaultUser);

  const user = useMemo(() => ({
    ...userData,
    isLoggedIn: userData.userId !== null,
    isAuthenticated: userData.uid !== null,
    login: async (part, userId, password) => {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: `${userId}@union-1002.com`,
        password
      });
      if (authError || !authData.user) {
        throw new Error("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
      }

      const { data: profileData, error: profileError } = await supabase
        .from('members')
        .select('username, part, role, fullname, engname, birthday, nationality, gen, age, height')
        .eq('id', authData.user.id)
        .single();
      if (profileError || !profileData) {
        await supabase.auth.signOut();
        throw new Error("사용자 정보를 불러오지 못했습니다.");
      }
      if (profileData.part !== part) {
        await supabase.auth.signOut();
        throw new Error("선택한 부서가 일치하지 않습니다.");
      }

      setUserData({
        userId,
        uid: authData.user.id,
        username: profileData.username,
        part: profileData.part,
        fullname: profileData.fullname,
        engname: profileData.engname,
        birthday: profileData.birthday,
        nationality: profileData.nationality,
        gen: profileData.gen,
        height: profileData.height,
        age: profileData.age,
        isAdmin: profileData.role === 'admin',
        hasNewNotes: true,
      });
    },
    loginWithoutAuth: async (part, userId, password) => {
      setUserData({
        ...defaultUser,
        userId,
        uid: null,
        username: userId,
        part: part,
        isAdmin: false,
        hasNewNotes: true,
      });
    },
    logout: async () => {
      if (userData.uid) {
        await supabase.auth.signOut();
      }
      setUserData(defaultUser);
    },
    clearNewNotes: () => {
      setUserData({ ...userData, hasNewNotes: false });
    },
  }), [userData]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data?.user) {
        setUserData(defaultUser);
      }
      supabase.auth.onAuthStateChange(async (e) => {
        if (e === 'SIGNED_OUT') {
          setUserData(defaultUser);
        }
      });
    })();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
