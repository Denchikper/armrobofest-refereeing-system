import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/base/Header";
import MiniFooter from "../../components/base/MiniFooter";
import LogoutButton from "../../components/auth/LogoutButton";
import OrganizerPanel from "../../components/Organizers/OrganizerPanel";
import BackgroundImagesGray from "../../components/base/BackgroundImagesGray";
import OlympiadInterface from "../../components/Organizers/OlympiadControl";

export default function OrganizatorMain() { 
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        olympiadText="УПРАВЛЕНИЕ СОРЕВНОВАНИЯМИ" 
      />
      <OrganizerPanel  user={user} icon="profile_red"/>
      <div className="grow pb-30 z-50">
        <OlympiadInterface token={token} logout={logout} navigate={navigate}/>
      </div>
      <LogoutButton logout={logout}/>
      <MiniFooter/>
      <BackgroundImagesGray/>
    </div>
  );
}