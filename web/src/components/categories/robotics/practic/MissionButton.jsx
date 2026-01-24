export default function MissionButton({title, disabled = false, onClick}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-8 py-4 shadow-md futura-heavy text-xl rounded-4xl z-50 
        ${disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-[#3AC318] text-white hover:bg-[#3AC318]/80'
        }`}
    >
      {title}
      
      <img 
        src={disabled ? "/icons/back_gray.svg" : "/icons/back_white.svg"} 
        alt="Стрелка" 
        className="w-6 h-6"
      />
    </button>
  );
}