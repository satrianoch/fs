import { CONFIG } from '../config/points';

interface Exercises {
  calories: number;
  jumpingJacks: number;
  jumpRope: number;
  squats: number;
  pushUps: number;
  weightLifted: number;
  sissyMua: number;
  beatSaber: number;
  fasting: number;
  weightLoss: boolean;
  joker: boolean;
}

const ensureNumber = (value: number): number => {
  return Number.isFinite(value) ? value : 0;
};

export const calculateTotalScore = (exercises: Exercises): number => {
  const scores = {
    calories: ensureNumber(exercises.calories * CONFIG.points.calories),
    jumpingJacks: ensureNumber(Math.floor(exercises.jumpingJacks * CONFIG.points.jumpingJacks)),
    jumpRope: ensureNumber(Math.floor(exercises.jumpRope * CONFIG.points.jumpRope)),
    squats: ensureNumber(exercises.squats * CONFIG.points.squats),
    pushUps: ensureNumber(exercises.pushUps * CONFIG.points.pushUps),
    weightLifted: ensureNumber(Math.floor(exercises.weightLifted * CONFIG.points.weightLifted)),
    sissyMua: ensureNumber(exercises.sissyMua * CONFIG.points.sissyMua),
    beatSaber: ensureNumber(exercises.beatSaber * CONFIG.points.beatSaber),
    fasting: ensureNumber(exercises.fasting * CONFIG.points.fasting),
    weightLoss: exercises.weightLoss ? CONFIG.points.weightLoss : 0,
    joker: exercises.joker ? CONFIG.points.joker : 0
  };

  return Math.floor(Object.values(scores).reduce((total, score) => ensureNumber(total) + ensureNumber(score), 0));
};