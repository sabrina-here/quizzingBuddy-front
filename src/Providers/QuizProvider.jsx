import { createContext, useState } from "react";

export const QuizContext = createContext();

export default function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState([
    {
      question: "What is the SI unit for measuring length?",
      answers: ["Meters", "Kilograms", "Seconds", "Liters"],
      correct: "Meters",
    },
    {
      question:
        "What is the acceleration due to gravity on Earth (approximately)?",
      answers: ["9.8 m/s^2", "6.3 m/s^2", "12.5 m/s^2", "5.2 m/s^2"],
      correct: "9.8 m/s^2",
    },
    {
      question: "What is the formula for calculating force?",
      answers: ["F = mv", "F = ma", "F = ms", "F = m^2"],
      correct: "F = ma",
    },
  ]);

  return (
    <QuizContext.Provider value={[quiz, setQuiz]}>
      {children}
    </QuizContext.Provider>
  );
}
