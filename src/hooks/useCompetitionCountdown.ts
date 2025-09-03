import { useState, useEffect } from 'react';
import type { Competition } from '../types/competition';

export const useCompetitionCountdown = (competition: Competition) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!competition.isActive || !competition.startTime) {
      setTimeRemaining('');
      setIsExpired(false);
      return;
    }

    const calculateTimeRemaining = () => {
      const now = new Date();
      const startTime = new Date(competition.startTime!);
      const endTime = new Date(startTime.getTime() + competition.duration * 60 * 1000);
      const remaining = endTime.getTime() - now.getTime();

      if (remaining <= 0) {
        setTimeRemaining('00:00');
        setIsExpired(true);
        return;
      }

      const minutes = Math.floor(remaining / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      setIsExpired(false);
    };

    // Initial calculation
    calculateTimeRemaining();

    // Set up interval to update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [competition.isActive, competition.startTime, competition.duration]);

  return {
    timeRemaining,
    isExpired,
    isActive: competition.isActive
  };
};
