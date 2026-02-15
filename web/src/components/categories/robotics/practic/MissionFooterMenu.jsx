import React, { useState } from 'react';

export default function MissionFooterMenu({ navigate, logoutParticapent, onComplete }) {
  const [isReady, setIsReady] = useState(false);

  const handleCompleteMission = () => {
    if (onComplete) {
      onComplete(); // Вызываем переданную функцию
    } else {
      // Старое поведение, если onComplete не передан
      if (navigate) {
        navigate(-1);
      }
    }
  };

  return ( 
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-2xl mx-auto">
      
      <div className="flex items-center justify-center cursor-pointer" onClick={() => setIsReady(!isReady)}>
        <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded-full mr-4">
          {isReady && (
            <div className="w-3 h-3 bg-[#3AC318] rounded-full"></div>
          )}
        </div>
        <span className="text-lg font-medium text-gray-800">
          Участник ознакомился с выставленными баллами
        </span>
      </div>

      <button
        onClick={handleCompleteMission}
        disabled={!isReady}
        className={`px-10 py-3 text-white shadow-md text-lg rounded-full flex items-center justify-center gap-2 font-bold transition-all ${
          isReady ? 'bg-[#3AC318] cursor-pointer' : 'bg-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        ЗАВЕРШИТЬ ВЫПОЛНЕНИЕ МИССИИ
        <img src="/icons/back_white.svg" alt="" />
      </button>

    </div>
  );
}