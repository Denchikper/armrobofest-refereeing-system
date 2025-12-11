import React, { useState } from 'react';

export default function MissionFooterMenu({ navigate, logoutParticapent }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, text: "УЧАСТНИК СОГЛАСЕН С ВЫСТАВЛЕННЫМИ БАЛЛАМИ" },
    { id: 2, text: "УЧАСТНИК НЕ СОГЛАСЕН С ВЫСТАВЛЕННЫМИ БАЛЛАМИ" }
  ];

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleCompleteMission = () => {
    if (!selectedOption) {
      alert("Пожалуйста, выберите вариант согласия с баллами");
      return;
    }

    console.log(selectedOption === 1 ? "Участник согласен" : "Участник не согласен");

    // Навигация
    if (navigate) {
      logoutParticapent();
      navigate('/robotics/practic/loginPaticapent');
    }
  };

  return (
  <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 p-6 w-full max-w-2xl">
    
    <div className="flex flex-col gap-3 items-center">
      {options.map((option) => (
        <div
          key={option.id}
          className="flex items-center cursor-pointer w-full "
          onClick={() => handleOptionClick(option.id)}
        >
          <div className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded-full mr-4">
            {selectedOption === option.id && (
              <div className="w-3 h-3 bg-[#3AC318] rounded-full"></div>
            )}
          </div>
          <span className="text-l font-medium text-gray-800">
            {option.text}
          </span>
        </div>
      ))}
    </div>

    <button
      onClick={handleCompleteMission}
      className="px-10 py-3 bg-[#3AC318] text-white futura-heavy shadow-md text-lg rounded-4xl flex items-center justify-center gap-2"
    >
      ЗАВЕРШИТЬ ВЫПОЛНЕНИЕ МИССИИ
      <img src="/icons/back_white.svg" />
    </button>

  </div>
);
}