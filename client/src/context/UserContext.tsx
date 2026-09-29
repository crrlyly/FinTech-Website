import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../models/User";

import { getCurrentUser } from "../services/authApi";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();

        setUser(data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
