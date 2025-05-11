import React from 'react';
import { Eye, Save, Trash } from 'lucide-react';

interface ControlsProps {
  onShowCards: () => void;
  onClearCards: () => void;
  onSaveCards: () => void;
  cardsCount: number;
}

const Controls: React.FC<ControlsProps> = ({ 
  onShowCards, 
  onClearCards, 
  onSaveCards,
  cardsCount
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button
        onClick={onShowCards}
        disabled={cardsCount === 0}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
          cardsCount === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
        }`}
      >
        <Eye className="mr-2 h-4 w-4" />
        Kartları Gör
      </button>
      
      <button
        onClick={onClearCards}
        disabled={cardsCount === 0}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
          cardsCount === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-red-100 text-red-800 hover:bg-red-200'
        }`}
      >
        <Trash className="mr-2 h-4 w-4" />
        Kartları Sil
      </button>
      
      <button
        onClick={onSaveCards}
        disabled={cardsCount === 0}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
          cardsCount === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
        }`}
      >
        <Save className="mr-2 h-4 w-4" />
        Kartları Kaydet (.txt)
      </button>
    </div>
  );
};

export default Controls;