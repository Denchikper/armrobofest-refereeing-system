export default function BackButton({onClick}) {
  return (
      <button
        onClick={onClick}
        className="fixed bottom-18 flex left-[10%] -translate-x-1/2 items-center justify-center gap-2 px-10 py-3 bg-[#CFFFC3] text-[#3AC318] futura-heavy text-xl rounded-4xl shadow-md z-50"
      >
        <img 
          src="/icons/back_green.svg" 
          alt="Назад" 
          className="w-6 h-6"
        />
        НАЗАД
      </button>
  );
}