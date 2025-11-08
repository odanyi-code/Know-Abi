import { useState, useEffect } from "react";

interface MotivationSystemProps {
  cardsCount: number;
  studyTime: number;
}

const MotivationSystem = ({
  cardsCount,
  studyTime,
}: MotivationSystemProps) => {
  const [message, setMessage] = useState("Welcome! 🌟");

  useEffect(() => {
    let currentMessage = "";
    if (cardsCount === 0) {
      currentMessage = "Welcome! 🌟";
    } else if (cardsCount === 1) {
      currentMessage = "You created your first card! 🎯";
    } else if (cardsCount === 5) {
      currentMessage = "You reached 5 cards! 🎯";
    } else if (cardsCount === 10) {
      currentMessage = "You reached 10 cards! 🌟";
    } else {
      // Messages based on time
      const minutes = Math.floor(studyTime / 60);
      if (minutes === 15) {
        currentMessage = "You have been studying for 15 minutes! ⏰";
      } else if (minutes === 25) {
        currentMessage = "You have been going for 25 minutes! 💪";
      } else {
        currentMessage = "Keep learning! 📚";
      }
    }

    setMessage(currentMessage);
  }, [cardsCount, studyTime]);

  return (
    <div className="motivation-system">
      <p>{message}</p>
    </div>
  );
};

export default MotivationSystem;
