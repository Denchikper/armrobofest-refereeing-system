
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/base/header";
import BackgroundImages from "../../components/base/backgroundImages";
import MiniFooter from "../../components/base/MiniFooter";
import LogoutButton from "../../components/auth/logoutButton";

export default function OrganizatorMain() { 
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        olympiadText="УПРАВЛЕНИЕ СОРЕВНОВАНИЯМИ" 
      />
      <BackgroundImages/>
      <LogoutButton logout={logout}/>
      <MiniFooter/>
    </div>
  );
}