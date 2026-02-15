import BackgroundImagesGray from "../../../components/base/BackgroundImagesGray";
import Header from "../../../components/base/Header";
import MiniFooter from "../../../components/base/MiniFooter";
import BackButton from "../../../components/categories/robotics/practic/BackButton";
import MissionFooterMenu from "../../../components/categories/robotics/practic/MissionFooterMenu";
import MissionResultBlock from "../../../components/categories/robotics/practic/MissionResultBlock";
import NameMission from "../../../components/categories/robotics/practic/NameMission";
import ParticipantMissionPanel from "../../../components/categories/robotics/practic/ParticipantMissionPanel";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMissionContext } from "../../../context/MissionContext";
import { useState, useRef } from "react"; // Добавлен useState
import { PostResultsApi } from "../../../api/Results";

export default function Mission() { 
  const { user, token, particapent, logoutParticapent, logout } = useAuth();
  const { mission, deleteMissionStorage } = useMissionContext();
  const navigate = useNavigate();
  const missionResultRef = useRef();
  
  const [missionScore, setMissionScore] = useState({ current: 0, max: 0 });

  const missionItems = mission.criteria.missionCriteria
  
  const handleLogout = () => {
    deleteMissionStorage();
    navigate(-1);
  };

  const handleMissionScoreChange = (score) => {
    setMissionScore(score);
  };

  const handleCompleteMission = async () => {
    // Получаем все результаты через ref
    const allResults = missionResultRef.current?.getResults();

    try {
       const res = await PostResultsApi(token, {partId: particapent.userId, missionId: mission.id, results: allResults}, logout, navigate)
    } catch {

    }

    console.log("Результаты миссии:", allResults);
    
    // TODO: Отправить результаты на сервер
    // sendResultsToServer(allResults);
    
    // Завершаем миссию
    handleLogout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        olympiadText="ОЛИМПИАДА ПО РОБОТОТЕХНИКЕ" 
        upJudgeOn={true} 
        upJudge={user}
      />
      <BackgroundImagesGray/>
      <NameMission title={mission?.name}/>
      <ParticipantMissionPanel participant={particapent}/>
      
      {/* Основной контент с отступами */}
      <div className="flex-1">
        <MissionResultBlock 
          ref={missionResultRef}
          items={missionItems}
          onMissionScoreChange={handleMissionScoreChange}
        />
      </div>
      
      {/* Меню сразу после итога */}
      <div className="mt-2 mb-12">
        <MissionFooterMenu 
          navigate={navigate} 
          logoutParticapent={logoutParticapent}
          onComplete={handleCompleteMission} // Добавлен пропс onComplete
        />
      </div>
      
      {/* Кнопка назад и футер */}
      <BackButton onClick={handleLogout}/>
      <MiniFooter/>
    </div>
  );
}