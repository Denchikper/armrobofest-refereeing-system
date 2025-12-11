import Header from "../../../components/base/header";
import BackgroundImages from "../../../components/base/backgroundImages";
import LoginModal from "../../../components/auth/loginModal";
import MiniFooter from "../../../components/base/MiniFooter";
import JudgePanel from "../../../components/categories/JudgePanel";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../../components/auth/logoutButton";

export default function PracticLoginPaticapent() {
  const { token, user, login, logout, loginParticapent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");

    setTimeout(() => {
      logout();
    }, 100);
    navigate("/");
  };

  return (
    <>  
        <BackgroundImages/>
        <Header olympiadText="ОЛИМПИАДА ПО РОБОТОТЕХНИКЕ"/>
        <JudgePanel judge={user} icon="profile"/>
        <LoginModal 
          upText="ВВЕДИТЕ КОД УЧАСТНИКА" 
          hasJudgePanel={true} 
          loginType="particapent"
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