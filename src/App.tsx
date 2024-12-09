import React, { useEffect } from 'react';
import { Activity, Dumbbell, Target, Trophy } from 'lucide-react';
import ScoreCard from './components/ScoreCard';
import ExerciseInput from './components/ExerciseInput';
import ThemeToggle from './components/ThemeToggle';
import CalorieCalculator from './components/CalorieCalculator';
import { calculateTotalScore } from './utils/scoreCalculator';
import { CONFIG } from './config/points';
import { useExercises } from './hooks/useExercises';
import { useThemeColor } from './hooks/useThemeColor';

function App() {
  const { exercises, saveExercises } = useExercises();
  const [isDark, setIsDark] = React.useState(true);
  const [showDebt, setShowDebt] = React.useState(false);
  const themeColor = useThemeColor(state => state.color);
  const setThemeColor = useThemeColor(state => state.setColor);
  const savedThemeColor = useThemeColor(state => state.savedColor);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const totalScore = calculateTotalScore(exercises);
    if (totalScore >= CONFIG.targetScore) {
      setThemeColor('green');
    } else {
      setThemeColor(savedThemeColor);
    }
  }, [exercises, setThemeColor, savedThemeColor]);

  const handleExerciseChange = (name: string, value: number | boolean) => {
    const newExercises = {
      ...exercises,
      [name]: value
    };
    saveExercises(newExercises);
  };

  const formatNumber = (num: number) => {
    return Number.isFinite(num) ? Number(num.toFixed(2)).toString() : '0';
  };

  const totalScore = calculateTotalScore(exercises);
  const progress = Number.isFinite(totalScore) ? (totalScore / CONFIG.targetScore) * 100 : 0;
  const progressColor = progress >= 100 ? `bg-${themeColor}-500` : `bg-${themeColor}-500`;

  const handleLongPress = () => {
    if (totalScore < CONFIG.targetScore) {
      setShowDebt(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ThemeToggle 
        isDark={isDark} 
        onToggle={() => setIsDark(!isDark)}
        onLongPress={handleLongPress}
        onLongPressEnd={() => setShowDebt(false)}
        themeColor={themeColor}
      />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Activity className={`w-12 h-12 text-${themeColor}-500 dark:text-${themeColor}-400 mr-3`} />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white select-none">FitScore</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg select-none">
            Calculez votre score d'activité physique hebdomadaire
          </p>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          <ScoreCard
            currentScore={totalScore}
            targetScore={CONFIG.targetScore}
            progress={progress}
            progressColor={progressColor}
            showDebt={showDebt}
            themeColor={themeColor}
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center select-none">
                <Target className={`w-6 h-6 mr-2 text-${themeColor}-500 dark:text-${themeColor}-400`} />
                Vos Activités
              </h2>
              
              <div className="space-y-4">
                <ExerciseInput
                  label="Calories brûlées"
                  value={exercises.calories}
                  onChange={(value) => handleExerciseChange('calories', value)}
                  points={CONFIG.points.calories}
                  unit="cal"
                />
                <ExerciseInput
                  label="Jumping Jacks"
                  value={exercises.jumpingJacks}
                  onChange={(value) => handleExerciseChange('jumpingJacks', value)}
                  points={CONFIG.points.jumpingJacks}
                  unit="reps"
                />
                <ExerciseInput
                  label="Sauts à la corde"
                  value={exercises.jumpRope}
                  onChange={(value) => handleExerciseChange('jumpRope', value)}
                  points={CONFIG.points.jumpRope}
                  unit="reps"
                />
                <ExerciseInput
                  label="Squats"
                  value={exercises.squats}
                  onChange={(value) => handleExerciseChange('squats', value)}
                  points={CONFIG.points.squats}
                  unit="reps"
                />
                <ExerciseInput
                  label="Pompes"
                  value={exercises.pushUps}
                  onChange={(value) => handleExerciseChange('pushUps', value)}
                  points={CONFIG.points.pushUps}
                  unit="reps"
                />
                <ExerciseInput
                  label="Poids soulevés"
                  value={exercises.weightLifted}
                  onChange={(value) => handleExerciseChange('weightLifted', value)}
                  points={CONFIG.points.weightLifted}
                  unit="kg"
                />
                <ExerciseInput
                  label="Trainings Sissy Mua"
                  value={exercises.sissyMua}
                  onChange={(value) => handleExerciseChange('sissyMua', value)}
                  points={CONFIG.points.sissyMua}
                  unit="minutes"
                />
                <ExerciseInput
                  label="Beat Saber"
                  value={exercises.beatSaber}
                  onChange={(value) => handleExerciseChange('beatSaber', value)}
                  points={CONFIG.points.beatSaber}
                  unit="morceaux"
                />
                <ExerciseInput
                  label="Jours hypocaloriques"
                  value={exercises.fasting}
                  onChange={(value) => handleExerciseChange('fasting', value)}
                  points={CONFIG.points.fasting}
                  unit="jours"
                />
                
                <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exercises.weightLoss}
                      onChange={(e) => handleExerciseChange('weightLoss', e.target.checked)}
                      className={`form-checkbox h-5 w-5 text-${themeColor}-500 dark:text-${themeColor}-400 rounded bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500`}
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-200 select-none">
                      Perte de poids
                    </span>
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-300 select-none">
                    +{CONFIG.points.weightLoss} points
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exercises.joker}
                      onChange={(e) => handleExerciseChange('joker', e.target.checked)}
                      className={`form-checkbox h-5 w-5 text-${themeColor}-500 dark:text-${themeColor}-400 rounded bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500`}
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-200 select-none">
                      Joker
                    </span>
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-300 select-none">
                    +{CONFIG.points.joker} points
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <CalorieCalculator />
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center select-none">
                  <Dumbbell className={`w-6 h-6 mr-2 text-${themeColor}-500 dark:text-${themeColor}-400`} />
                  Système de Points
                </h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 select-none">
                  <li>• Une calorie = {formatNumber(CONFIG.points.calories)} point</li>
                  <li>• Un jumping jack = {formatNumber(CONFIG.points.jumpingJacks)} point</li>
                  <li>• Un saut à la corde = {formatNumber(CONFIG.points.jumpRope)} point</li>
                  <li>• Un squat = {formatNumber(CONFIG.points.squats)} points</li>
                  <li>• Une pompe = {formatNumber(CONFIG.points.pushUps)} points</li>
                  <li>• Vingt-cinq kilos soulevés = 1 point</li>
                  <li>• Une minute avec Sissy Mua = {formatNumber(CONFIG.points.sissyMua)} points</li>
                  <li>• Un morceau Beat Saber = {formatNumber(CONFIG.points.beatSaber)} points</li>
                  <li>• Un jour hypocalorique = {formatNumber(CONFIG.points.fasting)} points</li>
                  <li>• Perte de poids = {CONFIG.points.weightLoss} points bonus</li>
                  <li>• Joker = {CONFIG.points.joker} points bonus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;