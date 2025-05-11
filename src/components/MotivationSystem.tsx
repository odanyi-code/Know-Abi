// src/components/MotivationSystem.tsx
import React, { useState, useEffect } from 'react';

interface MotivationSystemProps {
  cardsCount: number;        // Toplam kart sayısı
  studyTime: number;         // Çalışma süresi (saniye)
}

const MotivationSystem = ({ cardsCount, studyTime }: MotivationSystemProps) => {
  const [message, setMessage] = useState("Hoş geldin! 🌟");

  useEffect(() => {
    let currentMessage = "";

    if (cardsCount === 0) {
      currentMessage = "Hoş geldin! 🌟";
    } else if (cardsCount === 1) {
      currentMessage = "İlk kartını oluşturdun! 🎯";
    } else if (cardsCount === 5) {
      currentMessage = "5 karta ulaştın! 🎯";
    } else if (cardsCount === 10) {
      currentMessage = "10 karta ulaştın! 🌟";
    } else {
      // Süreye göre mesajlar
      const minutes = Math.floor(studyTime / 60);
      if (minutes === 15) {
        currentMessage = "15 dakikadır çalışıyorsun! ⏰";
      } else if (minutes === 25) {
        currentMessage = "25 saattir devam ediyorsun! 💪";
      } else {
        currentMessage = "Öğrenmeye devam! 📚";
      }
    }

    setMessage(currentMessage);
  }, [cardsCount, studyTime]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-3">
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{message}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {cardsCount} kart oluşturuldu • {Math.floor(studyTime / 60)} dakika çalışıldı
        </span>
      </div>
    </div>
  );
};

export default MotivationSystem;
