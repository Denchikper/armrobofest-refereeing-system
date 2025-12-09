export default function BackButton({onClick}) {
  return (
      <button
        onClick={onClick}
        className="fixed bottom-[10%] left-[10%] -translate-x-1/2 flex items-center justify-center gap-2 px-10 py-3 bg-[#cef1f8] text-[#00B7CF] futura-heavy text-xl rounded-4xl hover:bg-[#a6e9f7] transition-colors duration-200 shadow-md z-50"
      >
        <img 
          src="/icons/back.svg" 
          alt="Назад" 
          className="w-6 h-6"
        />
        НАЗАД
      </button>
  );
}