import BackgroundImagesGray from "../../../components/base/backgroundImagesGray";
import Header from "../../../components/base/Header";
import MiniFooter from "../../../components/base/MiniFooter";
import BackButton from "../../../components/categories/robotics/practic/BackButton";
import MissionFooterMenu from "../../../components/categories/robotics/practic/MissionFooterMenu";
import MissionResultBlock from "../../../components/categories/robotics/practic/MissionResultBlock";
import NameMission from "../../../components/categories/robotics/practic/NameMission";
import ParticipantMissionPanel from "../../../components/categories/robotics/practic/ParticipantMissionPanel";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MissionThree() { 
  const { user, particapent, logoutParticapent } = useAuth();
  const navigate = useNavigate();

  const missionOneItems = [
    { id: 1, text: "ЧИСТКА ЗОНЫ", points: 50, checked: false },
    { id: 2, text: "ОБНАРУЖЕНИЕ ДЕЙСТВУЮЩИХ МОСТОВ", points: 70, checked: false },
    { id: 3, text: "ПЕРЕПРАВА ЧЕРЕЗ ПРЕГРАДЫ, ОБНАРУЖЕНИЕ КЛАДА", points: 80, checked: false },
    { id: 4, text: "БОНУСНЫЕ БАЛЛЫ", points: 50, checked: false }
  ];

  const handleLogout = () => {
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
      <NameMission number={3}/>
      <ParticipantMissionPanel participant={particapent}/>
      <MissionResultBlock items={missionOneItems}/>
      <MissionFooterMenu navigate={navigate} logoutParticapent={logoutParticapent}/>
      <BackButton onClick={handleLogout}/>
      <MiniFooter/>
    </div>
  );
}