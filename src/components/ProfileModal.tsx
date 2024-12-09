import React from 'react';
import { User, UserRound } from 'lucide-react';

interface ProfileModalProps {
  onSelect: (profile: 'homme' | 'femme') => void;
  isOpen: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onSelect, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          Choisissez votre profil
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => onSelect('femme')}
            className="flex flex-col items-center p-6 bg-pink-50 dark:bg-pink-900/20 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-700"
          >
            <User className="w-16 h-16 text-pink-500 dark:text-pink-400 mb-3" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">Sam</span>
          </button>
          
          <button
            onClick={() => onSelect('homme')}
            className="flex flex-col items-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-700"
          >
            <UserRound className="w-16 h-16 text-blue-500 dark:text-blue-400 mb-3" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">Amaury</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;