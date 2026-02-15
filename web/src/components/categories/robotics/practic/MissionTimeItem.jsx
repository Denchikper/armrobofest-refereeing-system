import { useState, useEffect } from "react";

export default function MissionTimeItem({ index, item, onTimeChange }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setMinutes(0);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setMinutes(Math.max(0, Math.min(59, numValue)));
    }
  };

  const handleSecondsChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setSeconds(0);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setSeconds(Math.max(0, Math.min(59, numValue)));
    }
  };

  const handleMillisecondsChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setMilliseconds(0);
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setMilliseconds(Math.max(0, Math.min(999, numValue)));
    }
  };

  const formatTime = () => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');
  const displayMilliseconds = String(milliseconds).padStart(3, '0');

  useEffect(() => {
    if (onTimeChange) {
      onTimeChange({
        minutes,
        seconds,
        milliseconds,
        formatted: formatTime(),
        totalMilliseconds: (minutes * 60 * 1000) + (seconds * 1000) + milliseconds
      });
    }
  }, [minutes, seconds, milliseconds]);

  return (
    <div className="flex items-center gap-4 w-full pb-5">
      {/* Номер и текст */}
      <div className="flex items-center gap-2 min-w-max">
        <span className="text-[18px] futura-demi">{index}.</span>
        <span className="text-[18px] futura-demi uppercase text-blue-600">ВРЕМЯ</span>
      </div>

      {/* Линия */}
      <div className="flex-1 h-[3px] bg-blue-400 rounded-full"></div>

      {/* Поля ввода времени - выровнены по центру вертикали */}
      <div className="flex items-center gap-2 h-10">
        <div className="flex items-center gap-1">
          {/* Минуты */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={displayMinutes}
              onChange={handleMinutesChange}
              className="w-16 h-10 text-center text-[16px] futura-demi border-2 border-gray-300 rounded-lg focus:border-blue-400 outline-none"
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] futura-book text-gray-500">
              мин
            </span>
          </div>
          
          <span className="text-[20px] futura-demi text-gray-400 mx-1">:</span>
          
          {/* Секунды */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={displaySeconds}
              onChange={handleSecondsChange}
              className="w-16 h-10 text-center text-[16px] futura-demi border-2 border-gray-300 rounded-lg focus:border-blue-400 outline-none"
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] futura-book text-gray-500">
              сек
            </span>
          </div>
          
          <span className="text-[20px] futura-demi text-gray-400 mx-1">:</span>
          
          {/* Миллисекунды */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={displayMilliseconds}
              onChange={handleMillisecondsChange}
              className="w-20 h-10 text-center text-[16px] futura-demi border-2 border-gray-300 rounded-lg focus:border-blue-400 outline-none"
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] futura-book text-gray-500">
              мс
            </span>
          </div>
        </div>

        {/* Отображение форматированного времени */}
        <div className="ml-3 text-[14px] futura-demi text-blue-600 bg-blue-50 px-3 py-1 rounded-lg h-10 flex items-center">
          {formatTime()}
        </div>
      </div>
    </div>
  );
}