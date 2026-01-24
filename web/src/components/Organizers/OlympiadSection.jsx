import { ChevronDown, ChevronUp } from 'lucide-react';
import OlympiadBoxInSection from './OlympiadBoxInSection';
import { useState, useEffect } from 'react';
import { ControlMissionApi, GetMissonsApi } from '../../api/Mission';

const Section = ({token, logout, navigate, title, isExpanded, onToggle, lineColor, sectionId }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetMissionsFromApi = async () => {
    try {
      const result = await GetMissonsApi(token, logout, navigate);
      const data = result.data.missions;
      let filteredMissions = [];

      if (sectionId === 'robotics') {
        filteredMissions = data.filter(mission => mission.category_id === 1);
      } else if (sectionId === 'threeatlon') {
        console.log(result)
        filteredMissions = data.filter(mission => mission.category_id === 3);
      }
  
      const formattedMissions = filteredMissions.map(mission => ({
        id: mission.id,
        category_id: mission.category_id,
        missionNumber: mission.mission_number,
        title: mission.name,
        isClosed: !mission.enabled,
      }));
  
      return formattedMissions;
    } catch (error) {
      console.error('Ошибка загрузки миссий:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadMissions = async () => {
      if (!isExpanded) return;
      
      setLoading(true);
      try {
        const missionsArray = await GetMissionsFromApi();
        setMissions(missionsArray);
      } catch (error) {
        console.error('Ошибка загрузки миссий:', error);
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadMissions();
  }, [isExpanded, sectionId]);

  const handleMissionToggle = async (missionId) => {
    try {
      const mission = missions.find(m => m.id === missionId);
      if (!mission) return;
    
    // Новое состояние (инвертируем isClosed)
      const newIsOpen = mission.isClosed; // если было закрыто (true), станет открыто (true)
    
      const res = await ControlMissionApi(token, { missionId: missionId, newIsOpen: newIsOpen})

      if (!res.ok) {
        console.error(res.data.message || "Ошибка при обновлении миссий");
        return;
      }
    
    // Обновляем state - создаём новый массив с изменённой миссией
      setMissions(prevMissions => 
        prevMissions.map(m => 
          m.id === missionId 
            ? { ...m, isClosed: !m.isClosed }
            : m
        )
      );

    } catch (error) {
      console.error('Ошибка обработки клика по миссии:', error);
    }
  };

  return (
    <div className='mb-6'>
      <div className="overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 transition-colors"
        >
          <span className="futura-heavy text-[#2e2e2e] text-xl flex-1 text-left mr-16">
            {title}
          </span>
          {isExpanded ? 
            <ChevronUp className="text-black shrink-0 w-6 h-6" /> : 
            <ChevronDown className="text-black shrink-0 w-6 h-6" />
          }
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Загрузка миссий...</div>
          ) : missions.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {missions.map((mission) => (
                <div key={mission.id}>
                  <OlympiadBoxInSection 
                    title={mission.title}
                    isClosed={mission.isClosed}
                    onClickHandle={() => handleMissionToggle(mission.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">Нет доступных миссий</div>
          )}
        </div>
      )}
      
      <div className="flex-1 h-[3px] mt-2 rounded-full" style={{ backgroundColor: lineColor }}></div>
    </div>
  );
};

export default Section;