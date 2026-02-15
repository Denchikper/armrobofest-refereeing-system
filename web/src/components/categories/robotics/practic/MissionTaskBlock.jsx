import { useState, useEffect, useCallback, useRef } from "react";
import MissionResultItem from "./MissionResultItem";
import MissionBlockOneCheckItem from "./MissionBlockOneCheckItem";
import MissionBlockItem from "./MissionBlockItem";
import MissionTimeItem from "./MissionTimeItem";
import MissionSingleCounter from "./MissionSingleCounter";

export default function MissionTaskBlock({ task, onScoreChange, onTimeChange, onResultsChange }) {
  const [criteria, setCriteria] = useState([]);
  const [selectedBlockOptions, setSelectedBlockOptions] = useState({});
  const [penaltyBlockData, setPenaltyBlockData] = useState({});
  const [timeData, setTimeData] = useState({});
  const [singleCounterData, setSingleCounterData] = useState({});
  const [taskScore, setTaskScore] = useState({ current: 0, max: 0 });
  const [sortedCriteria, setSortedCriteria] = useState([]);
  
  const prevResultsRef = useRef("");

  const getSortedCriteria = useCallback(() => {
    return [...criteria].sort((a, b) => {
      const idA = String(a.id);
      const idB = String(b.id);
      return idA.localeCompare(idB, undefined, { numeric: true });
    });
  }, [criteria]);

  // Функция для сбора результатов задачи
  const getTaskResults = useCallback(() => {
    const results = [];
    const sorted = getSortedCriteria();
    
    sorted.forEach(item => {
      if (item.type === "block-one-check") {
        const selectedOptionId = selectedBlockOptions[item.id];
        const selectedOption = item["missions-block"]?.find(opt => opt.id === selectedOptionId);
        
        results.push({
          name: item.name,
          points: selectedOption?.points || 0,
          selected: selectedOption?.text || null,
          maxPoints: Math.max(...(item["missions-block"]?.map(opt => opt.points) || [0]))
        });
      }
      else if (item.type === "block" || item.type === "block-fines") {
        const blockData = penaltyBlockData[item.id] || { counters: {}, checks: {} };
        
        item["missions-block"]?.forEach(option => {
          if (option.type === "counter") {
            const count = blockData.counters?.[option.id] || 0;
            results.push({
              name: option.text,
              points: (option.points || 0) * count,
              count: count,
              maxCount: option.max || Infinity
            });
          } else if (option.type === "checkbox") {
            const checked = blockData.checks?.[option.id] || false;
            results.push({
              name: option.text,
              points: checked ? (option.points || 0) : 0,
              checked: checked
            });
          }
        });
      }
      else if (item.type === "counter") {
        const count = singleCounterData[item.id] || 0;
        results.push({
          name: item.text,
          points: (item.points || 0) * count,
          count: count,
          maxCount: item.max || Infinity
        });
      }
      else if (item.type === "time") {
        const time = timeData[item.id] || { minutes: 0, seconds: 0, milliseconds: 0 };
        results.push({
          type: "time",
          minutes: time.minutes || 0,
          seconds: time.seconds || 0,
          milliseconds: time.milliseconds || 0
        });
      }
      else {
        results.push({
          name: item.text,
          points: item.checked ? (item.points || 0) : 0,
          checked: item.checked || false
        });
      }
    });
    
    return results;
  }, [criteria, selectedBlockOptions, penaltyBlockData, singleCounterData, timeData, getSortedCriteria]);

  // Отправляем результаты только при реальных изменениях
  useEffect(() => {
    if (onResultsChange) {
      const results = getTaskResults();
      const resultsString = JSON.stringify(results);
      
      if (prevResultsRef.current !== resultsString) {
        prevResultsRef.current = resultsString;
        onResultsChange(task.id, results);
      }
    }
  }, [getTaskResults, task.id, onResultsChange]);

  useEffect(() => {
    if (task?.criteria) {
      const criteriaWithChecked = task.criteria.map(item => ({
        ...item,
        checked: false
      }));
      
      const sorted = [...criteriaWithChecked].sort((a, b) => {
        const idA = String(a.id);
        const idB = String(b.id);
        return idA.localeCompare(idB, undefined, { numeric: true });
      });
      
      setCriteria(criteriaWithChecked);
      setSortedCriteria(sorted);
      
      const blockOneCheckItems = task.criteria.filter(
        item => item.type === "block-one-check"
      );
      
      const initialSelected = {};
      blockOneCheckItems.forEach(block => {
        initialSelected[block.id] = null;
      });
      setSelectedBlockOptions(initialSelected);
    }
  }, [task]);

  // Подсчет баллов для задачи
  useEffect(() => {
    calculateTaskScore();
  }, [criteria, selectedBlockOptions, penaltyBlockData, singleCounterData]);

  const calculateTaskScore = () => {
  // Баллы за обычные критерии (чекбоксы)
  const regularScore = criteria
    .filter(item => item.type !== "block-one-check" && item.type !== "time" && item.type !== "block" && item.type !== "block-fines" && item.type !== "counter")
    .reduce((sum, item) => sum + (item.checked ? (item.points || 0) : 0), 0);

  const regularMax = criteria
    .filter(item => item.type !== "block-one-check" && item.type !== "time" && item.type !== "block" && item.type !== "block-fines" && item.type !== "counter")
    .reduce((sum, item) => sum + (item.points || 0), 0);

  // Баллы за block-one-check
  let blockScore = 0;
  let blockMax = 0;

  criteria
    .filter(item => item.type === "block-one-check")
    .forEach(block => {
      const selectedOptionId = selectedBlockOptions[block.id];
      const selectedOption = block["missions-block"]?.find(opt => opt.id === selectedOptionId);
      
      if (selectedOption) {
        blockScore += selectedOption.points || 0;
      }
      
      const maxPoints = Math.max(...(block["missions-block"]?.map(opt => opt.points) || [0]));
      blockMax += maxPoints;
    });

  // Баллы за обычные блоки (чекбоксы)
  let blockRegularScore = 0;
  let blockRegularMax = 0;
  
  // Баллы за штрафные блоки
  let penaltyScore = 0;

  criteria
    .filter(item => item.type === "block" || item.type === "block-fines")
    .forEach(block => {
      const blockData = penaltyBlockData[block.id];
      const isFines = block.type === "block-fines";
      
      if (isFines) {
        // ШТРАФЫ - отрицательные баллы
        if (blockData) {
          // Счетчики
          Object.entries(blockData.counters || {}).forEach(([optionId, count]) => {
            const option = block["missions-block"]?.find(opt => opt.id === parseInt(optionId));
            if (option && count > 0) {
              penaltyScore += (option.points || 0) * count;
            }
          });
          
          // Чекбоксы
          Object.entries(blockData.checks || {}).forEach(([optionId, checked]) => {
            if (checked) {
              const option = block["missions-block"]?.find(opt => opt.id === parseInt(optionId));
              if (option) {
                penaltyScore += option.points || 0;
              }
            }
          });
        }
      } else {
        // ОБЫЧНЫЙ БЛОК - положительные баллы
        if (blockData) {
          // Чекбоксы
          Object.entries(blockData.checks || {}).forEach(([optionId, checked]) => {
            if (checked) {
              const option = block["missions-block"]?.find(opt => opt.id === parseInt(optionId));
              if (option) {
                blockRegularScore += option.points || 0;
              }
            }
          });
        }
        
        const maxPoints = block["missions-block"]?.reduce((sum, opt) => sum + (opt.points || 0), 0) || 0;
        blockRegularMax += maxPoints;
      }
    });

  // ✅ ИСПРАВЛЕНО: Баллы за одиночные счетчики с учетом связанности
  let counterScore = 0;
  let counterMax = 0;
  
  // Проверяем, есть ли связанные счетчики (для задачи 3)
  const hasLinkedCounters = task.id === 3 && 
    criteria.some(c => c.id === 2) && 
    criteria.some(c => c.id === 3);
  
  if (hasLinkedCounters) {
    // Для связанных счетчиков максимальный балл считается по-другому
    const partialCounter = criteria.find(c => c.id === 2);
    const fullCounter = criteria.find(c => c.id === 3);
    const maxTotal = partialCounter?.max || 5;
    
    // Текущие баллы
    const partialCount = singleCounterData[2] || 0;
    const fullCount = singleCounterData[3] || 0;
    
    counterScore = (partialCount * (partialCounter?.points || 3)) + 
                   (fullCount * (fullCounter?.points || 6));
    
    // Максимальный балл: все кубики полностью (самый выгодный вариант)
    counterMax = maxTotal * (fullCounter?.points || 6);
    
    // Добавляем остальные счетчики, если есть (например, штрафные)
    criteria
      .filter(item => item.type === "counter" && item.id !== 2 && item.id !== 3)
      .forEach(item => {
        const count = singleCounterData[item.id] || 0;
        counterScore += (item.points || 0) * count;
        const maxCount = item.max || 0;
        counterMax += (item.points || 0) * maxCount;
      });
  } else {
    // Обычные независимые счетчики
    criteria
      .filter(item => item.type === "counter")
      .forEach(item => {
        const count = singleCounterData[item.id] || 0;
        counterScore += (item.points || 0) * count;
        const maxCount = item.max || 0;
        counterMax += (item.points || 0) * maxCount;
      });
  }

  const currentTotal = regularScore + blockScore + blockRegularScore + penaltyScore + counterScore;
  const maxTotal = regularMax + blockMax + blockRegularMax + counterMax;

  setTaskScore({ current: currentTotal, max: maxTotal });
  
  if (onScoreChange) {
    onScoreChange(task.id, { current: currentTotal, max: maxTotal });
  }
};

  const toggleItem = (id) => {
    setCriteria(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    
    setSortedCriteria(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleBlockOptionSelect = (blockId, optionId) => {
    setSelectedBlockOptions(prev => ({
      ...prev,
      [blockId]: prev[blockId] === optionId ? null : optionId
    }));
  };

  const handlePenaltyBlockDataChange = (blockId, data) => {
    setPenaltyBlockData(prev => ({
      ...prev,
      [blockId]: data
    }));
  };

  const handleTimeChange = (itemId, timeValue) => {
    setTimeData(prev => ({
      ...prev,
      [itemId]: timeValue
    }));

    if (onTimeChange) {
      onTimeChange(task.id, timeValue);
    }
  };

  // ✅ НОВАЯ ФУНКЦИЯ: Обработка связанных счетчиков для кубиков
  const handleLinkedCountersChange = (changedItemId, newValue) => {
    // Находим оба связанных счетчика
    const partialCounter = criteria.find(c => c.id === 2); // ID частично
    const fullCounter = criteria.find(c => c.id === 3);   // ID полностью

    if (!partialCounter || !fullCounter) {
      // Если это не те счетчики, просто обновляем как обычно
      setSingleCounterData(prev => ({
        ...prev,
        [changedItemId]: newValue
      }));
      return;
    }

    const partialId = partialCounter.id;
    const fullId = fullCounter.id;
    const maxTotal = partialCounter.max || 5; // Всего кубиков

    // Текущие значения
    let newPartial = singleCounterData[partialId] || 0;
    let newFull = singleCounterData[fullId] || 0;

    // Обновляем в зависимости от того, какой счетчик изменился
    if (changedItemId === fullId) {
      newFull = Math.min(newValue, maxTotal);
      newPartial = Math.min(newPartial, maxTotal - newFull);
    } else if (changedItemId === partialId) {
      newPartial = Math.min(newValue, maxTotal);
      newFull = Math.min(newFull, maxTotal - newPartial);
    }

    // Обновляем состояние обоих счетчиков
    setSingleCounterData(prev => ({
      ...prev,
      [fullId]: newFull,
      [partialId]: newPartial
    }));
  };

  // ✅ ОБНОВЛЕННАЯ: Обработка изменений счетчиков
  const handleSingleCounterDataChange = (itemId, value) => {
    // Проверяем, являются ли это связанные счетчики для задачи 3
    if (task.id === 3 && (itemId === 2 || itemId === 3)) {
      handleLinkedCountersChange(itemId, value);
    } else {
      // Обычное поведение для остальных счетчиков
      setSingleCounterData(prev => ({
        ...prev,
        [itemId]: value
      }));
    }
  };

  // Функция для рендеринга критерия в зависимости от типа
  const renderCriteriaItem = (item, index) => {
    if (item.type === "block-one-check") {
      return (
        <MissionBlockOneCheckItem
          key={item.id}
          index={index + 1}
          block={item}
          selectedOptionId={selectedBlockOptions[item.id]}
          onSelect={handleBlockOptionSelect}
        />
      );
    } else if (item.type === "block" || item.type === "block-fines") {
      return (
        <MissionBlockItem
          key={item.id}
          index={index + 1}
          block={item}
          onBlockDataChange={handlePenaltyBlockDataChange}
        />
      );
    } else if (item.type === "counter") {
      // ✅ ОБНОВЛЕНО: Для связанных счетчиков передаем дополнительные пропсы
      if (task.id === 3 && (item.id === 2 || item.id === 3)) {
        const partialCounter = criteria.find(c => c.id === 2);
        const fullCounter = criteria.find(c => c.id === 3);
        const maxTotal = partialCounter?.max || 5;

        let currentVal = singleCounterData[item.id] || 0;
        let dynamicMax = maxTotal;

        if (item.id === 2) { // Частично
          const fullVal = singleCounterData[3] || 0;
          dynamicMax = maxTotal - fullVal;
        } else if (item.id === 3) { // Полностью
          const partialVal = singleCounterData[2] || 0;
          dynamicMax = maxTotal - partialVal;
        }

        return (
          <MissionSingleCounter
            key={item.id}
            index={index + 1}
            item={item}
            onCounterChange={handleSingleCounterDataChange}
            currentValue={currentVal}
            max={dynamicMax}
          />
        );
      } else {
        // Обычный счетчик
        return (
          <MissionSingleCounter
            key={item.id}
            index={index + 1}
            item={item}
            onCounterChange={handleSingleCounterDataChange}
            currentValue={singleCounterData[item.id] || 0}
            max={item.max}
          />
        );
      }
    } else if (item.type === "time") {
      return (
        <MissionTimeItem
          key={item.id}
          index={index + 1}
          item={item}
          onTimeChange={(timeValue) => handleTimeChange(item.id, timeValue)}
        />
      );
    } else {
      return (
        <MissionResultItem
          key={item.id}
          index={index + 1}
          item={item}
          onClick={() => toggleItem(item.id)}
        />
      );
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
        <h4 className="text-[18px] futura-demi text-gray-700">
          Задача: {task.name || `Задание ${task.id}`}
        </h4>
        <div className="text-[16px] futura-demi bg-gray-100 px-3 py-1 rounded-full">
          <span className={taskScore.current < 0 ? "text-red-500" : "text-[#3AC318]"}>
            {taskScore.current}
          </span>
          <span className="text-gray-500"> / {taskScore.max}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        {sortedCriteria.map((item, index) => renderCriteriaItem(item, index))}
      </div>
    </div>
  );
}