import { useState, useEffect } from "react";

export default function MissionSingleCounter({ index, item, onCounterChange, currentValue, max }) {
  const [counterValue, setCounterValue] = useState(currentValue || 0);
  const maxValue = max !== undefined ? max : (item.max || Infinity);

  // Синхронизируем внутренний state, если currentValue изменился извне
  useEffect(() => {
    if (currentValue !== undefined) {
      setCounterValue(currentValue);
    }
  }, [currentValue]);

  const handleCounterChange = (increment) => {
    setCounterValue(prev => {
      let newValue = Math.max(0, prev + increment);
      
      if (maxValue !== Infinity) {
        newValue = Math.min(maxValue, newValue);
      }
      
      if (onCounterChange) {
        onCounterChange(item.id, newValue);
      }
      
      return newValue;
    });
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Номер и текст */}
      <div className="flex items-center gap-2 min-w-max">
        <span className="text-[18px] futura-demi">{index}.</span>
        <span className="text-[18px] futura-demi uppercase">{item.text}</span>
        <span className="text-[14px] futura-demi text-[#3AC318] ml-1">
          (+{item.points} б.)
        </span>
        {maxValue !== Infinity && (
          <span className="text-[14px] futura-demi text-gray-500 ml-1">
            / {maxValue}
          </span>
        )}
      </div>

      {/* Линия */}
      <div className="flex-1 h-[3px] bg-[#3AC318] rounded-full"></div>

      {/* Счетчик */}
      <div className="flex items-center gap-1">
        {/* Кнопка минус */}
        <button
          onClick={() => handleCounterChange(-1)}
          disabled={!counterValue}
          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-colors
            ${counterValue > 0 
              ? "border-[#3AC318] text-[#3AC318] hover:bg-[#3AC318]/10" 
              : "border-gray-200 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          −
        </button>
        
        {/* Значение счетчика */}
        <div className="w-10 h-8 flex items-center justify-center text-[20px] futura-demi">
          {counterValue}
          {maxValue !== Infinity && (
            <span className="text-[14px] text-gray-400 ml-1">/{maxValue}</span>
          )}
        </div>
        
        {/* Кнопка плюс */}
        <button
          onClick={() => handleCounterChange(1)}
          disabled={counterValue >= maxValue}
          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-colors
            ${counterValue < maxValue 
              ? "border-[#3AC318] text-[#3AC318] hover:bg-[#3AC318]/10" 
              : "border-gray-200 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          +
        </button>
      </div>
    </div>
  );
}