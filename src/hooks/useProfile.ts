import { useState, useEffect } from 'react';
import { ExerciseState } from '../types';
import { supabase } from '../lib/supabase';

const STORAGE_KEY_PREFIX = 'fitScore_';

export const useProfile = () => {
  const [currentProfile, setCurrentProfile] = useState<'homme' | 'femme' | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [exercises, setExercises] = useState<ExerciseState>({
    calories: 0,
    jumpingJacks: 0,
    jumpRope: 0,
    squats: 0,
    pushUps: 0,
    weightLifted: 0,
    sissyMua: 0,
    fasting: 0,
    weightLoss: false,
    joker: false
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('currentProfile');
    if (savedProfile === 'homme' || savedProfile === 'femme') {
      setCurrentProfile(savedProfile);
      setShowModal(false);
      
      const savedExercises = localStorage.getItem(`${STORAGE_KEY_PREFIX}${savedProfile}`);
      if (savedExercises) {
        setExercises(JSON.parse(savedExercises));
      }

      // Synchronise avec Supabase
      syncWithSupabase(savedProfile);
    }
  }, []);

  const syncWithSupabase = async (profile: string) => {
    try {
      const { data: existingData } = await supabase
        .from('exercises')
        .select('data')
        .eq('profile', profile)
        .single();

      if (existingData) {
        setExercises(existingData.data);
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${profile}`, JSON.stringify(existingData.data));
      }

      // Souscription aux changements en temps réel
      const channel = supabase
        .channel('exercises')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'exercises',
          filter: `profile=eq.${profile}`
        }, (payload) => {
          if (payload.new) {
            const newData = payload.new as any;
            setExercises(newData.data);
            localStorage.setItem(`${STORAGE_KEY_PREFIX}${profile}`, JSON.stringify(newData.data));
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (error) {
      console.error('Erreur de synchronisation avec Supabase:', error);
    }
  };

  const selectProfile = async (profile: 'homme' | 'femme') => {
    setCurrentProfile(profile);
    setShowModal(false);
    localStorage.setItem('currentProfile', profile);
    
    const savedExercises = localStorage.getItem(`${STORAGE_KEY_PREFIX}${profile}`);
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }

    syncWithSupabase(profile);
  };

  const saveExercises = async (newExercises: ExerciseState) => {
    if (currentProfile) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${currentProfile}`, JSON.stringify(newExercises));
      setExercises(newExercises);

      try {
        await supabase
          .from('exercises')
          .upsert({ 
            profile: currentProfile, 
            data: newExercises 
          }, { 
            onConflict: 'profile' 
          });
      } catch (error) {
        console.error('Erreur de sauvegarde dans Supabase:', error);
      }
    }
  };

  const switchProfile = () => {
    setShowModal(true);
  };

  return {
    currentProfile,
    showModal,
    exercises,
    selectProfile,
    saveExercises,
    switchProfile
  };
};