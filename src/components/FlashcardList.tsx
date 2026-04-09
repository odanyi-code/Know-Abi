import React from 'react';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardListProps {
  cards: FlashcardType[];
}

const FlashcardList: React.FC<FlashcardListProps> = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Henüz kart oluşturmadınız. Yukarıdaki formu kullanarak bir kart oluşturun.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Flashcard 
          key={card.id} 
          question={card.question} 
          answer={card.answer} 
        />
      ))}
    </div>
  );
};

export default FlashcardList;