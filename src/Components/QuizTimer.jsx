import { useState, useEffect, useContext } from "react";
import { QuizContext } from "../Providers/QuizProvider";

const QuizTimer = ({ onTimeUp, stopTimer }) => {
  const {
    timer: timeLeft,
    setTimer: setTimeLeft,
    quizDuration,
  } = useContext(QuizContext);
  useEffect(() => {
    if (stopTimer) {
      return; // Exit early, do nothing
    }

    if (timeLeft <= 0) {
      onTimeUp(); // Call when timer reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, stopTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-lg font-bold">
      Time Left: {formatTime(timeLeft)}
      <div>
        <div className="w-full bg-gray-300 h-2 rounded">
          <div
            className="h-full bg-green-500 rounded"
            style={{ width: `${(timeLeft / quizDuration) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizTimer;
