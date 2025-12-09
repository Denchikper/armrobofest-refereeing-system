export default function MissionButton({ disabled = false, numMission, onClick}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-8 py-4 futura-heavy text-xl rounded-4xl z-50 
        ${disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-[#00B7CF] text-white hover:bg-[#00B7CF]/80'
        }`}
    >
      <span className="text-2xl font-bold">{numMission}</span>
      МИССИЯ
      
      <img 
        src={disabled ? "/icons/back_gray.svg" : "/icons/back_white.svg"} 
        alt="Стрелка" 
        className="w-6 h-6"
      />
    </button>
  );
}