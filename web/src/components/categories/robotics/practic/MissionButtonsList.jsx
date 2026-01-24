import { useState, useEffect } from "react";
import { GetMissonsApi } from "../../../../api/Mission";
import MissionButton from "./MissionButton";
import { useMissionContext } from "../../../../context/MissionContext";

export default function MissionButtonsList({ token, logout, navigate, categoryId = 1 }) {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMissionStorage } = useMissionContext();

  useEffect(() => {
    const loadMissions = async () => {
      try {
        setLoading(true);
        const result = await GetMissonsApi(token, logout, navigate);
        
        if (result?.data?.missions) {
          // Фильтруем миссии по category_id
          const filteredMissions = result.data.missions
            .filter(mission => mission.category_id === categoryId)
            .sort((a, b) => a.mission_number - b.mission_number);
          delete filteredMissions[0];
          setMissions(filteredMissions);
        }
      } catch (err) {
        console.error('Error loading missions:', err);
        // В случае ошибки показываем кнопки по умолчанию
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };

    loadMissions();

    // Обновляем каждые 60 секунд
    const intervalId = setInterval(loadMissions, 60000);
    return () => clearInterval(intervalId);
  }, [token, logout, navigate, categoryId]);

  // Если загрузка, показываем скелетон
  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-30 px-4">
        Загрузка...
      </div>
    );
  }

  // Если есть загруженные миссии, показываем их
  if (missions.length > 0) {
    return (
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-30 px-4">
        {missions.map((mission) => (
          <MissionButton 
            key={mission.id}
            title={mission.name || `Миссия ${mission.mission_number}`}
            disabled={!mission.enabled}
            isClosed={!mission.enabled}
            onClick={() => {
              if (mission.enabled) {
                setMissionStorage(mission);
                navigate(`/robotics/practic/mission`);
              }
            }}
          />
        ))}
      </div>
    );
  }
}