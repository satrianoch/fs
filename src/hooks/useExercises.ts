import { useState, useEffect } from 'react';
import { ExerciseState } from '../types';

const STORAGE_KEY = 'fitScore_exercises';

export const useExercises = () => {
  const [exercises, setExercises] = useState<ExerciseState>({
    calories: 0,
    jumpingJacks: 0,
    jumpRope: 0,
    squats: 0,
    pushUps: 0,
    weightLifted: 0,
    sissyMua: 0,
    beatSaber: 0,
    fasting: 0,
    weightLoss: false,
    joker: false
  });

  useEffect(() => {
    const savedExercises = localStorage.getItem(STORAGE_KEY);
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }
  }, []);

  const saveExercises = (newExercises: ExerciseState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newExercises));
    setExercises(newExercises);
  };

  return {
    exercises,
    saveExercises
  };
};