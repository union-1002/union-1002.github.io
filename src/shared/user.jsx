import { createContext, useContext, useMemo } from 'react';
import { useSessionStorage } from 'react-use';

const defaultUser = {
  name: null,
  group: null,
  hasNewNotes: false,
  isLoggedIn: () => false,
  login: (name, group) => {},
  logout: () => {},
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
    isLoggedIn: () => userData.name != null,
    login: (name, group) => {
      setUserData({ name, group, hasNewNotes: true });
    },
    logout: () => {
      setUserData(defaultUser);
    },
    clearNewNotes: () => {
      setUserData({ ...userData, hasNewNotes: false });
    }
  }), [userData]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
