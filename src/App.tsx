import React, { useEffect, useState } from 'react';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import Controls from './components/Controls';
import { useFlashcards } from './hooks/useFlashcards';
import { SparklesIcon } from 'lucide-react';
import logo from './assets/logo.png.png'; // Make sure the file name matches!
import MotivationSystem from './components/MotivationSystem';
import DailyGoal from './components/DailyGoal';
import FunctionDrawer from './components/FunctionDrawer';

function App() {
  const { 
    cards, 
    isCreating, 
    cardsVisible,
    error,
    createCard, 
    clearCards, 
    saveCards, 
    toggleCardsVisibility 
  } = useFlashcards();

  const [seconds, setSeconds] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Kartı çözdüğünde çağrılacak fonksiyon
  const handleSolveCard = () => {
    setSolvedCount(prev => prev + 1);
  };

  const handleClearCards = () => {
    // Implement the logic to clear cards
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-16">
              <img src={logo} alt="KnowAbi Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KnowAbi</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Öğrenmek istediğiniz herhangi bir konu için yapay zeka destekli bilgi kartları oluşturun.
            Kartları kaydedin, inceleyin ve öğrenmenizi pekiştirin.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <FlashcardForm onCreateCard={createCard} isLoading={isCreating} />

            {error && (
              <div className="w-full max-w-md mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-200">
                {error}
              </div>
            )}

            <Controls 
              onShowCards={toggleCardsVisibility}
              onClearCards={clearCards}
              onSaveCards={saveCards}
              cardsCount={cards.length}
            />

            <button
              className="w-full mb-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
              onClick={handleClearCards}
            >
              Kartları Sil
            </button>
          </div>

          {cardsVisible && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-all max-h-[600px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
                {cards.length > 0 ? 'Oluşturulan Kartlar' : 'Henüz Kart Yok'}
              </h2>
              <FlashcardList cards={cards} />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-4 left-4 bg-white/80 dark:bg-black/80 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-lg text-sm z-50">
        Uygulamada geçen süre: {Math.floor(seconds / 60)} dakika {seconds % 60} saniye
      </div>

      <MotivationSystem 
        cardsCount={cards.length}
        studyTime={studyTime}
      />

      <DailyGoal solvedCount={solvedCount} goal={20} />

      <button
        onClick={() => setSolvedCount(solvedCount + 1)}
        className="fixed top-20 left-0 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Kart Çözdüm!
      </button>

      <FunctionDrawer />
    </div>
  );
}

export default App;
