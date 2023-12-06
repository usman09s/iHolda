import { useEffect, useState } from 'react';

export const useTimer = ({ initialSeconds = 80, started = false }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [seconds, setSeconds] = useState(initialSeconds % 60);
  const [minutes, setMinutes] = useState(Math.floor(initialSeconds / 60));
  const [shouldRestart, setShouldRestart] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (shouldRestart) {
        setMinutes(Math.floor(initialSeconds / 60));
        setSeconds(initialSeconds % 60);
        setShouldRestart(false);
      } else {
        if (!isStopped) {
          if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            setIsFinished(true);
          } else if (seconds === 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setSeconds(seconds - 1);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, shouldRestart, isStopped, initialSeconds]);

  const restartTimer = () => {
    setShouldRestart(true);
    setIsFinished(false);
  };

  const stopTimer = () => {
    setIsStopped(true);
  };

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return {
    isFinished,
    counter: `${formattedMinutes}:${formattedSeconds}`,
    totalSeconds: initialSeconds,
    restartTimer,
    stopTimer,
  };
};
