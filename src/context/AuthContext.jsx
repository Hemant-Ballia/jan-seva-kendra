import { createContext, useContext, useEffect, useState } from "react";

import api, { clearToken, getToken, setToken } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore the session on first load using the stored token.
  useEffect(() => {
    const bootstrap = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (details) => {
    const { data } = await api.post("/auth/register", details);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
