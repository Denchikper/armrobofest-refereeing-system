import React, { createContext, useContext, useState, useEffect } from "react";

import { unstable_batchedUpdates } from 'react-dom';
import { useNavigate } from "react-router-dom";

const MissionContext = createContext();


export function MissionProvider({ children }) {
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
    const savedMission = localStorage.getItem("mission");

    if (savedMission) {
      try {
        setMission(JSON.parse(savedMission));
      } catch {
        localStorage.removeItem("mission");
      }
    }
    setLoading(false);
  }, 100);
    return () => clearTimeout(timer);
  }, []);


  const deleteMissionStorage = () => {
    localStorage.removeItem("mission");
  };

  const setMissionStorage = (mission) => {
    unstable_batchedUpdates(() => {
      setMission(mission);
    });
    localStorage.setItem("mission", JSON.stringify(mission));
  };

  return (
    <MissionContext.Provider value={{ 
        mission, 
        deleteMissionStorage,
        setMissionStorage,
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissionContext() {
  const context = useContext(MissionContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}