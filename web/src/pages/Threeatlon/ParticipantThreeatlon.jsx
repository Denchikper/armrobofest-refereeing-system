import Header from "../../components/base/Header";
import BackgroundImages from "../../components/base/BackgroundImages";
import MiniFooter from "../../components/base/MiniFooter";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ParticipantPanel from "../../components/categories/robotics/practic/ParticipantPanel";
import MissionButtonsList from "../../components/categories/robotics/practic/MissionButtonsList";

export default function ParticipantThreeatlon() { 
  const { token, logout, particapent, logoutParticapent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutParticapent();
    navigate("/threeatlon/loginPaticapent");
  };

  return (
    <>  
      <BackgroundImages/>
      <Header 
        olympiadText="СОРЕВНОВАНИЯ «ТРИАТЛОН»" 
      />
      
      <div className="mt-32 flex flex-col items-center ">
        <ParticipantPanel participant={particapent}/>
        <MissionButtonsList token={token} logout={logout} navigate={navigate} categoryId={3}/>
      </div>
      
      <button
        onClick={handleLogout}
        className="fixed bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 px-10 py-3 bg-[#CFFFC3] text-[#3AC318] futura-heavy text-xl rounded-4xl hover:bg-[#b9ffa8] transition-colors duration-200 shadow-md z-50"
      >
        <img 
          src="/icons/back_green.svg" 
          alt="Назад" 
          className="w-6 h-6"
        />
        НАЗАД
      </button>
      
      <MiniFooter/>
    </>
  );
}