import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import MissionTaskBlock from "./MissionTaskBlock";
import MissionResultTotal from "./MissionResultTotal";

const MissionResultBlock = forwardRef(({ items: initialItems, onMissionTimeChange, missionId }, ref) => {
  const [tasks, setTasks] = useState([]);
  const [taskScores, setTaskScores] = useState({});
  const [taskTimes, setTaskTimes] = useState({});
  const [missionScore, setMissionScore] = useState({ current: 0, max: 0 });
  const [missionTime, setMissionTime] = useState(null);
  const [taskResults, setTaskResults] = useState({});

  useEffect(() => {
    setTasks(initialItems || []);
  }, [initialItems]);

  useEffect(() => {
    let currentTotal = 0;
    let maxTotal = 0;
    
    Object.values(taskScores).forEach(score => {
      currentTotal += score.current || 0;
      maxTotal += score.max || 0;
    });
    
    setMissionScore({ current: currentTotal, max: maxTotal });
  }, [taskScores]);

  useEffect(() => {
    if (Object.keys(taskTimes).length === 0) return;
    
    let totalMinutes = 0;
    let totalSeconds = 0;
    let totalMilliseconds = 0;
    
    Object.values(taskTimes).forEach(time => {
      if (time) {
        totalMinutes += time.minutes || 0;
        totalSeconds += time.seconds || 0;
        totalMilliseconds += time.milliseconds || 0;
      }
    });
    
    totalSeconds += Math.floor(totalMilliseconds / 1000);
    totalMilliseconds = totalMilliseconds % 1000;
    
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    
    const totalTime = {
      minutes: totalMinutes,
      seconds: totalSeconds,
      milliseconds: totalMilliseconds
    };
    
    setMissionTime(totalTime);
    
    if (onMissionTimeChange) {
      onMissionTimeChange(totalTime);
    }
  }, [taskTimes, onMissionTimeChange]);

  const handleTaskScoreChange = (taskId, score) => {
    setTaskScores(prev => ({
      ...prev,
      [taskId]: score
    }));
  };

  const handleTaskTimeChange = (taskId, time) => {
    setTaskTimes(prev => ({
      ...prev,
      [taskId]: time
    }));
  };

  const handleTaskResultsChange = (taskId, results) => {
    setTaskResults(prev => ({
      ...prev,
      [taskId]: results
    }));
  };

  // Функция для получения всех результатов в нужном формате
  const getAllResults = () => {
    const missionResults = [];
    
    tasks.forEach(task => {
      const taskResult = {
        task: task.id,
        n_header: task.n_header,
        result: taskResults[task.id] || [],
        full_time: taskTimes[task.id] ? {
          minutes: taskTimes[task.id].minutes || 0,
          seconds: taskTimes[task.id].seconds || 0,
          milliseconds: taskTimes[task.id].milliseconds || 0
        } : null
      };
      
      missionResults.push(taskResult);
    });
    
    return missionResults;
  };

  // Экспортируем функцию через ref
  useImperativeHandle(ref, () => ({
    getResults: getAllResults
  }));

  return (
    <div className="w-full max-w-5xl mx-auto mt-5 px-6">
      
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <MissionTaskBlock
            key={task.id}
            task={task}
            missionId={missionId}
            onScoreChange={handleTaskScoreChange}
            onTimeChange={handleTaskTimeChange}
            onResultsChange={handleTaskResultsChange}
          />
        ))}
      </div>

      <MissionResultTotal 
        total={missionScore.current} 
        max={missionScore.max} 
        time={missionTime}
      />

    </div>
  );
});

export default MissionResultBlock;