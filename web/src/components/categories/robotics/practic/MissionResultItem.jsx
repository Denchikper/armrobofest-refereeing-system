export default function MissionResultItem({ index, text, checked, onClick }) {
  return (
    <div className="flex items-center gap-4">

      {/* Номер и текст */}
      <div className="flex items-center gap-2 min-w-max">
        <span className="text-[18px] futura-demi">{index}.</span>
        <span className="text-[18px] futura-demi uppercase">{text}</span>
      </div>

      {/* Линия */}
      <div className="flex-1 h-[3px] bg-[#3AC318] rounded-full"></div>

      {/* Чекбокс */}
      <div
        onClick={onClick}
        className={`w-8 h-8 rounded-lg border-2 cursor-pointer flex items-center justify-center
          ${checked ? "bg-[#3AC318] border-[#3AC318]" : "border-gray-300"}
        `}
      >
        {checked && (
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        )}
      </div>

    </div>
  );
}