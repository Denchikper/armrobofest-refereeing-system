export default function LogoutButton({logout}) {
  const handleLogout = () => {
    navigate("/participant");
  };

  return (
    <button
        onClick={logout}
        className="flex fixed bottom-20 items-center justify-center gap-3  futura-heavy text-xl left-1/2 -translate-x-1/2 px-10 py-3 bg-[#FFDDDD] text-[#EE2222] rounded-4xl  shadow-md z-50"
        >
        ВЫЙТИ
        <img 
            src="/icons/exit.svg" 
            alt="Выход" 
            className="w-6 h-6"
        />
    </button>
  );
}