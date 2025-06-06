import { createContext, useContext, useEffect, useMemo, useState } from "react";
import supabase from "@/shared/supabase";

const defaultUser = {
  userid: null,
  username: null,
  uid: null,
  part: null,
  isAdmin: false,
  hasNewNotes: false,
  isLoggedIn: () => false,
  login: () => {},
  logout: () => {},
  clearNewNotes: () => {},
};

const UserContext = createContext(defaultUser);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(defaultUser);

  // 로그인 상태 유지
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (user) {
        const uid = user.id;
        const { data: member } = await supabase
          .from("members")
          .select("username, part, role")
          .eq("id", uid)
          .single();

        if (member) {
          setUserData({
            userid: user.email.split("@")[0],
            uid: user.id,
            username: member.username,
            part: member.part,
            isAdmin: member.role === "admin",
          });
        }
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUserData(defaultUser);
      } else if (event === "SIGNED_IN" && session?.user) {
        fetchUser();
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const user = useMemo(() => ({
    ...userData,
    isLoggedIn: () => userData.userid !== null,
    login: async () => {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (user) {
        const { data: member } = await supabase
          .from("members")
          .select("username, part, role")
          .eq("id", user.id)
          .single();
        if (member) {
          setUserData({
            userid: user.email.split("@")[0],
            uid: user.id,
            username: member.username,
            part: member.part,
            isAdmin: member.role === "admin",
          });
        }
      }
    },
    logout: async () => {
      await supabase.auth.signOut();
      setUserData(defaultUser);
    },
    clearNewNotes: () => {
      setUserData({ ...userData, hasNewNotes: false });
    },
  }), [userData]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
