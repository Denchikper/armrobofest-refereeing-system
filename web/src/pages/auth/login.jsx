import Header from "../../components/base/Header";
import BackgroundImages from "../../components/base/BackgroundImages";
import LoginModal from "../../components/auth/LoginModal";
import MiniFooter from "../../components/base/MiniFooter";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { token, login, logout, loginParticapent } = useAuth();
  const navigate = useNavigate();
  return (
    <>
        <BackgroundImages/>
        <Header />
        <LoginModal 
          upText="ВВЕДИТЕ ПРИСВОЕННЫЙ ВАМ КОД" 
          hasJudgePanel={false}
          loginType="user" 
          isUser={true} 
          userToken={token} 
          login={login}
          logout={logout}
          loginParticapent={loginParticapent}
          navigate={navigate}
          />
        <MiniFooter/>
    </>
  );
}