import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { unstable_batchedUpdates } from 'react-dom';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [particapent, setParticipant] = useState(null); // ← ОПЕЧАТКА ОСТАВЛЯЕМ
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedParticipant = localStorage.getItem("particapent");
    
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(savedToken);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
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
  }, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = (newToken, newUser, address) => {
    unstable_batchedUpdates(() => {
      setToken(newToken);
      setUser(newUser);
    });

    navigate(address);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
      setToken(null);

      setUser(null);
      setParticipant(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("particapent");
  };

  const loginParticapent = (participantToken, newParticipant, address) => {
    setTimeout(() => {
      navigate(address);
    }, 100);

    unstable_batchedUpdates(() => {
      setParticipant(newParticipant);
    });

    localStorage.setItem("particapent", JSON.stringify(newParticipant));
  };

  const logoutParticapent = () => {
    setTimeout(() => {
      setParticipant(null);
    }, 300);
    
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
      logoutParticapent, // ← ОПЕЧАТКА
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