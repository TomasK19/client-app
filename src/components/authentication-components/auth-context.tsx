import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface AuthContextProps {
  auth: {
    token: string | null;
    email: string | null;
    userId: string | null;
    username: string | null;
  };
  login: (
    token: string,
    email: string,
    userId: string,
    username: string
  ) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{
    token: string | null;
    email: string | null;
    userId: string | null;
    username: string | null;
  }>({
    token: null,
    email: null,
    userId: null,
    username: null,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    const savedUserId = localStorage.getItem("userId");
    const savedUsername = localStorage.getItem("username");
    if (savedToken && savedEmail && savedUserId && savedUsername) {
      setAuth({
        token: savedToken,
        email: savedEmail,
        userId: savedUserId,
        username: savedUsername,
      });
    }
  }, []);

  const login = (
    token: string,
    email: string,
    userId: string,
    username: string
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    setAuth({ token, email, userId, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setAuth({ token: null, email: null, userId: null, username: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
