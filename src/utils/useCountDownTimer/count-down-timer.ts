import { useState, useEffect } from 'react';

export const useCountDownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
  }, [timeLeft, isActive]);

  const startTimer = () => {
    if (seconds > 0) {
      setTimeLeft(seconds);
      setIsActive(true);
    }
  };

  return { timeLeft, startTimer };
};
