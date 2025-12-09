import Header from "../../../components/base/header";
import BackgroundImages from "../../../components/base/backgroundImages";
import LoginModal from "../../../components/auth/loginModal";
import MiniFooter from "../../../components/base/MiniFooter";
import JudgePanel from "../../../components/categories/JudgePanel";
import { useAuth } from "../../../context/AuthContext";

export default function PracticLoginPaticapent() {
  const { user, logout } = useAuth();
  return (
    <>  
        <BackgroundImages/>
        <Header olympiadText="ОЛИМПИАДА ПО РОБОТОТЕХНИКЕ"/>
        <JudgePanel judge={user}/>
        <LoginModal upText="ВВЕДИТЕ КОД УЧАСТНИКА" hasJudgePanel={true} loginType="particapent"/>
        <button
            onClick={logout}
            className="flex items-center justify-center gap-3 bottom-[10%] futura-heavy text-xl absolute left-1/2 -translate-x-1/2 px-10 py-3 bg-[#FFDDDD] text-[#EE2222] rounded-4xl hover:bg-[#fad4d4] transition-colors duration-200 shadow-md z-50"
          >
            ВЫЙТИ
            <img 
               src="/icons/exit.svg" 
                alt="Выход" 
                className="w-6 h-6"
            />
          </button>
        <MiniFooter/>
    </>
  );
}