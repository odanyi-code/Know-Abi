import React, { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="w-full max-w-sm cursor-pointer mx-auto"
      onClick={handleFlip}
    >
      <div 
        className={`relative w-full transition-transform duration-500 transform-gpu ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d', minHeight: '13rem' }}
      >
        {/* Front side (Question) */}
        <div 
  className={`absolute w-full h-52 rounded-lg bg-gray-100 dark:bg-gray-800 p-6 flex flex-col justify-between ${
    isFlipped ? 'pointer-events-none' : ''
  }`}
  style={{ backfaceVisibility: 'hidden' }}
>
  <div className="text-center">
    <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Soru</div>
    <div className="text-lg font-medium text-gray-800 dark:text-gray-100">{question}</div>
  </div>
  <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
    Kartı çevirmek için tıklayın
  </div>
</div>


        {/* Back side (Answer) */}
        <div 
          className={`absolute w-full rounded-lg bg-indigo-100 p-6 flex flex-col ${
            !isFlipped ? 'pointer-events-none' : ''
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center">
            <div className="text-xs uppercase tracking-wide text-indigo-700 mb-1">Cevap</div>
            <div className="text-lg font-medium text-gray-800 whitespace-pre-wrap break-words">
              {answer}
            </div>
          </div>
          <div className="text-center text-xs text-gray-600 mt-4">Kartı çevirmek için tıklayın</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
