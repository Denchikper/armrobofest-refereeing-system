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

export default function Mission() { 
  const { user, particapent, logoutParticapent } = useAuth();
  const { mission, deleteMissionStorage } = useMissionContext();

  const navigate = useNavigate();

  const missionItems = mission.criteria.missionCriteria
  
  const handleLogout = () => {
    deleteMissionStorage();
    navigate(-1);
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
      <MissionResultBlock items={missionItems}/>
      <MissionFooterMenu navigate={navigate} logoutParticapent={logoutParticapent}/>
      <BackButton onClick={handleLogout}/>
      <MiniFooter/>
    </div>
  );
}