import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [particapent, setParticipant] = useState(null); // ← ОПЕЧАТКА ОСТАВЛЯЕМ
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedParticipant = localStorage.getItem("particapent");
    
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(savedToken);
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
    
    if (savedParticipant) {
      try {
        const participantData = JSON.parse(savedParticipant);
        setParticipant(participantData);
      } catch {
        localStorage.removeItem("particapent");
      }
    }
    
    setLoading(false);
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    const decoded = jwtDecode(newToken);
    setUser(decoded);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const loginParticapent = (participantToken) => { // ← ТАКАЯ ЖЕ ОПЕЧАТКА
    // Декодируем токен участника
    const decodedParticipant = jwtDecode(participantToken);
    setParticipant(decodedParticipant);
    // Сохраняем как JSON строку с ОПЕЧАТКОЙ
    localStorage.setItem("particapent", JSON.stringify(decodedParticipant));
  };

  const logoutParticapent = () => { // ← ТАКАЯ ЖЕ ОПЕЧАТКА
    setParticipant(null);
    localStorage.removeItem("particapent");
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      login, 
      logout, 
      loading, 
      particapent, // ← ОПЕЧАТКА
      loginParticapent, // ← ОПЕЧАТКА
      logoutParticapent // ← ОПЕЧАТКА
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}