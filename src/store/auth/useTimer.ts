import { useEffect, useState } from 'react';

type TimerProps = {
  duration: number;
  onTimeout: () => void;
};

export const useTimer = ({ duration, onTimeout }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  let timer: NodeJS.Timer;

  useEffect(() => {
    if (remainingTime === 0) {
      onTimeout();

      return;
    }

    timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [onTimeout, remainingTime]);

  const remainingTimeValue = remainingTime < 10 ? `0${remainingTime}` : remainingTime;

  const resetTimer = () => setRemainingTime(duration);

  const clearTimer = () => clearInterval(timer);

  return {
    resetTimer,
    clearTimer,
    remainingTime: remainingTimeValue,
  };
};
