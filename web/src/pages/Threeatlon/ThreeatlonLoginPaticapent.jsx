
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackgroundImages from "../../components/base/BackgroundImages";
import Header from "../../components/base/Header";
import JudgePanel from "../../components/categories/JudgePanel";
import LoginModal from "../../components/auth/LoginModal";
import LogoutButton from "../../components/auth/LogoutButton";
import MiniFooter from "../../components/base/MiniFooter";


export default function ThreeatlonLoginPaticapent() {
  const { token, user, login, logout, loginParticapent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
  };

  return (
    <>  
        <BackgroundImages/>
        <Header olympiadText="СОРЕВНОВАНИЯ «ТРИАТЛОН»"/>
        <JudgePanel judge={user} icon="profile"/>
        <LoginModal 
          upText="ВВЕДИТЕ КОД УЧАСТНИКА" 
          hasJudgePanel={true} 
          loginType="particapent"
          path="/robotics/threeatlon/participant"
          userToken={token} 
          login={login}
          logout={logout}
          loginParticapent={loginParticapent}
          navigate={navigate}
          />
        <LogoutButton logout={handleLogout}/>
        <MiniFooter/>
    </>
  );
}