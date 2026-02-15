import { useState } from "react";

export default function MissionBlockItem({ index, block, onBlockDataChange }) {
  const [counterValues, setCounterValues] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  // Определяем, является ли блок штрафным
  const isFines = block.type === "block-fines";
  
  // Цветовая схема в зависимости от типа
  const colors = {
    header: isFines ? "text-red-500" : "",
    line: isFines ? "bg-red-500" : "bg-[#3AC318]",
    checkbox: {
      checked: isFines ? "bg-red-500 border-red-500" : "bg-[#3AC318] border-[#3AC318]",
      unchecked: isFines ? "border-gray-300 hover:border-red-400" : "border-gray-300 hover:border-[#3AC318]"
    },
    points: isFines ? "text-red-500" : "text-gray-500",
    button: {
      enabled: isFines 
        ? "border-red-400 text-red-600 hover:bg-red-50" 
        : "border-[#3AC318] text-[#3AC318] hover:bg-[#3AC318]/10",
      disabled: "border-gray-200 text-gray-300 cursor-not-allowed"
    }
  };

  const handleCounterChange = (optionId, increment) => {
    setCounterValues(prev => {
      const currentValue = prev[optionId] || 0;
      
      // Находим опцию, чтобы узнать max
      const option = block["missions-block"]?.find(opt => opt.id === optionId);
      const maxValue = option?.max || Infinity;
      
      let newValue = Math.max(0, currentValue + increment);
      
      // Ограничиваем максимумом, если он задан
      if (maxValue !== Infinity) {
        newValue = Math.min(maxValue, newValue);
      }
      
      const updated = { ...prev, [optionId]: newValue };
      
      if (onBlockDataChange) {
        onBlockDataChange(block.id, {
          counters: updated,
          checks: checkedItems
        });
      }
      
      return updated;
    });
  };

  const handleCheckboxToggle = (optionId) => {
    setCheckedItems(prev => {
      const newChecked = !prev[optionId];
      const updated = { ...prev, [optionId]: newChecked };
      
      if (onBlockDataChange) {
        onBlockDataChange(block.id, {
          counters: counterValues,
          checks: updated
        });
      }
      
      return updated;
    });
  };

  return (
    <div className="flex flex-col w-full mt-2">
      {/* Заголовок блока */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[18px] futura-demi">{index}.</span>
          <span className={`text-[18px] futura-demi uppercase ${colors.header}`}>
            {block.name}
          </span>
        </div>
        <div className={`flex-1 h-[3px] ${colors.line} rounded-full`}></div>
        <div className="w-8 h-8"></div>
      </div>

      {/* Элементы блока */}
      <div className="flex flex-col gap-3 pl-8">
        {block["missions-block"]?.map((option) => {
          const maxValue = option.max || Infinity;
          const currentValue = counterValues[option.id] || 0;
          
          return (
            <div key={option.id} className="flex items-center gap-4">
              
              {/* Текст и тип контрола */}
              <div className="flex items-center gap-2 min-w-max flex-1">
                <span className="text-[16px] futura-book text-gray-600">—</span>
                <span className="text-[16px] futura-demi uppercase">{option.text}</span>
                
                {/* Отображение баллов */}
                <span className={`text-[14px] futura-demi ml-2 ${
                  option.points < 0 ? 'text-red-500' : colors.points
                }`}>
                  ({option.points > 0 ? '+' : ''}{option.points} б.)
                </span>
                
                {/* Отображение максимума для счетчика */}
                {option.type === "counter" && maxValue !== Infinity && (
                  <span className="text-[14px] futura-demi text-gray-500 ml-1">
                    / {maxValue}
                  </span>
                )}
                
                <div className={`flex-1 h-[3px] ${colors.line} rounded-full`}></div>
              </div>

              {/* Разные типы контролов */}
              {option.type === "counter" && (
                <div className="flex items-center gap-1">
                  {/* Кнопка минус */}
                  <button
                    onClick={() => handleCounterChange(option.id, -1)}
                    disabled={!currentValue}
                    className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-colors
                      ${currentValue > 0 
                        ? colors.button.enabled 
                        : colors.button.disabled
                      }
                    `}
                  >
                    −
                  </button>
                  
                  {/* Значение счетчика */}
                  <div className="w-14 h-8 flex items-center justify-center text-[20px] futura-demi">
                    {currentValue}
                    {maxValue !== Infinity && (
                      <span className="text-[14px] text-gray-400 ml-1">/{maxValue}</span>
                    )}
                  </div>
                  
                  {/* Кнопка плюс */}
                  <button
                    onClick={() => handleCounterChange(option.id, 1)}
                    disabled={currentValue >= maxValue}
                    className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-colors
                      ${currentValue < maxValue 
                        ? colors.button.enabled 
                        : colors.button.disabled
                      }
                    `}
                  >
                    +
                  </button>
                </div>
              )}

              {option.type === "checkbox" && (
                <div
                  onClick={() => handleCheckboxToggle(option.id)}
                  className={`w-8 h-8 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-colors
                    ${checkedItems[option.id] 
                      ? colors.checkbox.checked 
                      : colors.checkbox.unchecked
                    }
                  `}
                >
                  {checkedItems[option.id] && (
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}