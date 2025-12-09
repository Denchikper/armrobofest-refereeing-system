import Header from "../../../components/base/header";
import MiniFooter from "../../../components/base/MiniFooter";
import BackButton from "../../../components/categories/robotics/practic/backButton";
import NameMission from "../../../components/categories/robotics/practic/nameMission";
import ParticipantMissionPanel from "../../../components/categories/robotics/practic/ParticipantMissionPanel";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MissionOne() { 
  const { user, particapent, logoutParticapent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/participant");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        olympiadText="ОЛИМПИАДА ПО РОБОТОТЕХНИКЕ" 
        upJudgeOn={true} 
        upJudge={user}
      />
      <NameMission number={1}/>
      <ParticipantMissionPanel participant={particapent}/>
      <BackButton onClick={handleLogout}/>
      <MiniFooter/>
    </div>
  );
}