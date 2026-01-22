import "./SessionTimer.css";
import { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext";

export const SessionTimer = () => {
  const { userData } = useUser();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!userData?.tokenExp) return;

    const interval = setInterval(() => {
      const remaining = Math.floor(
        (userData.tokenExp * 1000 - Date.now()) / 1000,
      );
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [userData?.tokenExp]);

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "00:00";

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const pad = (num) => String(num).padStart(2, "0");

    return `${pad(hours)}hs ${pad(minutes)}m`;
  };

  if (timeLeft <= 0) return null;

  return <span>{formatTime(timeLeft)}</span>;
};
