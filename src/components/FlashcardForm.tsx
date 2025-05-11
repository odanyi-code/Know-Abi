import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface FlashcardFormProps {
  onCreateCard: (topic: string) => void;
  isLoading: boolean;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onCreateCard, isLoading }) => {
  const [topic, setTopic] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCard(topic);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            id="topicInput"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Konu gir (örn: biyoloji, tarih) veya boş bırak"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
            isLoading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Oluşturuluyor...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Kart Oluştur
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default FlashcardForm;