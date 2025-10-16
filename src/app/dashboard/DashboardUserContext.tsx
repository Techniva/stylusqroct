"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const DashboardUserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DashboardUserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </DashboardUserContext.Provider>
  );
};

export const useUser = () => useContext(DashboardUserContext);
// ✅ Explicit export for hook
export const useDashboardUser = () => useContext(DashboardUserContext);

