// MissionBlockOneCheckItem.jsx
export default function MissionBlockOneCheckItem({ index, block, selectedOptionId, onSelect }) {
  return (
    <div className="flex flex-col w-full">
      
      {/* Заголовок блока как отдельный элемент в том же стиле */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[18px] futura-demi">{index}.</span>
          <span className="text-[18px] futura-demi uppercase">{block.name}</span>
        </div>
        <div className="flex-1 h-[3px] bg-[#3AC318] rounded-full"></div>
        <div className="w-8 h-8"></div>
      </div>

      {/* Варианты выбора */}
      <div className="flex flex-col gap-5 pl-8">
        {block["missions-block"]?.map((option) => (
          <div 
            key={option.id}
            className="flex items-center gap-4"
          >
            {/* Текст варианта */}
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-[16px] futura-demi text-gray-600">—</span>
              <span className="text-[16px] futura-demi uppercase">{option.text}</span>
              <span className="text-[14px] futura-demi text-[#3AC318] ml-1">
                (+{option.points} б.)
              </span>
            </div>

            {/* Линия */}
            <div className="flex-1 h-[3px] bg-[#3AC318] rounded-full"></div>

            {/* Радио-кнопка (стилизованная под чекбокс но с круглой галочкой) */}
            <div
              onClick={() => onSelect(block.id, option.id)}
              className={`w-8 h-8 rounded-lg border-2 cursor-pointer flex items-center justify-center
                ${selectedOptionId === option.id 
                  ? "bg-[#3AC318] border-[#3AC318]" 
                  : "border-gray-300"
                }
              `}
            >
              {selectedOptionId === option.id && (
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}