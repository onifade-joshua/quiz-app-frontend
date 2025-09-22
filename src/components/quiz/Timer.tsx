import React, { useEffect, useState } from "react";

interface TimerProps {
  startTime: number | null;
  duration: number; // in seconds
  isActive: boolean;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ startTime, duration, isActive, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive || !startTime) return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        onTimeUp(); // ⬅️ Auto submit
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, duration, isActive, onTimeUp]);

  return <div className="font-bold text-lg">⏱️ {timeLeft}s</div>;
};

export default Timer;
