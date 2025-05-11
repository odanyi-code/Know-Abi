import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Flashcard } from '../types';
import { generateFlashcard } from '../services/aiService';
import { saveToTextFile } from '../utils/fileUtils';

export const useFlashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const createCard = async (topic: string) => {
    setIsCreating(true);
    setError(null);
    try {
      const { question, answer } = await generateFlashcard(topic || 'random');
      
      const newCard: Flashcard = {
        id: uuidv4(),
        question,
        answer,
        topic: topic || 'random',
        createdAt: new Date()
      };
      
      setCards((prevCards: Flashcard[]) => [...prevCards, newCard]);
      setCardsVisible(true);
    } catch (error) {
      console.error('Error creating flashcard:', error);
      setError(error instanceof Error ? error.message : 'Kart oluşturulurken bir hata oluştu');
    } finally {
      setIsCreating(false);
    }
  };
  
  const clearCards = () => {
    if (window.confirm('Tüm kartları silmek istediğinizden emin misiniz?')) {
      setCards([]);
      setError(null);
    }
  };
  
  const saveCards = () => {
    try {
      const cardsData = cards.map((card: Flashcard) => ({
        question: card.question,
        answer: card.answer
      }));
      
      saveToTextFile(cardsData);
      setError(null);
    } catch (error) {
      console.error('Error saving cards:', error);
      setError(error instanceof Error ? error.message : 'Kartlar kaydedilirken bir hata oluştu');
    }
  };
  
  const toggleCardsVisibility = () => {
    setCardsVisible(!cardsVisible);
  };
  
  return {
    cards,
    isCreating,
    cardsVisible,
    error,
    createCard,
    clearCards,
    saveCards,
    toggleCardsVisibility
  };
};