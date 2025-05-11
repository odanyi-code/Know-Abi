import React, { useEffect, useState } from 'react';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import Controls from './components/Controls';
import { useFlashcards } from './hooks/useFlashcards';
import { SparklesIcon } from 'lucide-react';

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
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-black">
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition-colors z-50"
      >
        {darkMode ? 'Açık Tema' : 'Koyu Tema'}
      </button>
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="h-8 w-8 text-indigo-600 mr-2" />
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
          </div>
          
          {cardsVisible && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-all">
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
    </div>
  );
}

export default App;