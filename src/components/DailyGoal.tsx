import React, { useEffect, useState } from 'react';

interface DailyGoalProps {
  solvedCount?: number;
  goal?: number;
}

const DailyGoal = ({ solvedCount = 0, goal = 20 }: DailyGoalProps) => {
  const [achieved, setAchieved] = useState(false);

  useEffect(() => {
    setAchieved(solvedCount >= goal);
  }, [solvedCount, goal]);

  return (
    <div className="fixed top-0 left-0 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-3">
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Günlük Hedef: {goal}</span>
        <span className="text-xl text-gray-900 dark:text-gray-100">{solvedCount} / {goal}</span>
        {achieved && (
          <span className="ml-2 text-2xl" title="Tebrikler! Rozet kazandın!">🏅</span>
        )}
      </div>
      {achieved && (
        <div className="mt-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-center font-semibold">
          Tebrikler! Günlük hedefini tamamladın ve rozet kazandın! 🏅
        </div>
      )}
    </div>
  );
};

export default DailyGoal;
