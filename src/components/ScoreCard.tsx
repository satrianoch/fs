import React, { useEffect, useRef } from 'react';
import { Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScoreCardProps {
  currentScore: number;
  targetScore: number;
  progress: number;
  progressColor: string;
  showDebt?: boolean;
  themeColor: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  currentScore,
  targetScore,
  progress,
  progressColor,
  showDebt = false,
  themeColor
}) => {
  const hasShownConfetti = useRef(false);

  useEffect(() => {
    if (progress >= 100 && !hasShownConfetti.current) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          hasShownConfetti.current = true;
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [progress]);

  const calculateDebt = (): number => {
    if (typeof currentScore !== 'number' || typeof targetScore !== 'number') {
      return 0;
    }
    if (currentScore >= targetScore) {
      return 0;
    }
    const debt = Math.ceil((targetScore - currentScore) / 2);
    return Number.isFinite(debt) ? debt : 0;
  };

  const formatProgress = (value: number): number => {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.min(Math.round(value), 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center select-none">
          <Trophy className={`w-6 h-6 mr-2 text-${themeColor}-500 dark:text-${themeColor}-400`} />
          {showDebt ? "Votre Dette" : "Votre Score"}
        </h2>
        <div className="text-right">
          {showDebt ? (
            <>
              <p className="text-4xl font-bold text-gray-900 dark:text-white select-none">{calculateDebt()}€</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 select-none">à payer</p>
            </>
          ) : (
            <>
              <p className="text-4xl font-bold text-gray-900 dark:text-white select-none">{currentScore}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 select-none">sur {targetScore} points</p>
            </>
          )}
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <span className={`text-xs font-semibold text-${themeColor}-600 dark:text-${themeColor}-400 select-none`}>
            PROGRESSION
          </span>
          <span className={`text-xs font-semibold text-${themeColor}-600 dark:text-${themeColor}-400 select-none`}>
            {formatProgress(progress)}%
          </span>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <div
            style={{ width: `${formatProgress(progress)}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${progressColor}`}
          ></div>
        </div>
      </div>

      {progress >= 100 && !showDebt && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
          <p className="text-green-700 dark:text-green-300 font-medium text-center select-none">
            Félicitations ! Vous avez atteint votre objectif ! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;