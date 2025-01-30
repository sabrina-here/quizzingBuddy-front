import { createContext, useEffect, useState } from "react";
import fetchQuizQuestions from "../Components/fetchQuizQuestions";

export const QuizContext = createContext();

export default function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState([]);

  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);

  const handleQuiz = async (t, n, d) => {
    setTopic(t);
    setNumQuestions(n);
    setDifficulty(d);
    setLoading(true); // Set loading to true before fetching

    try {
      const response = await fetchQuizQuestions(t, n, d);
      setQuiz(response);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false); // Ensure loading is false after fetching, even if an error occurs
    }
  };

  const quizInfo = {
    quiz,
    topic,
    numQuestions,
    difficulty,
    handleQuiz,
    loading,
  };

  // useEffect(() => {
  //   console.log("Updated quiz state:", quiz);
  // }, [quiz]);

  return (
    <QuizContext.Provider value={quizInfo}>{children}</QuizContext.Provider>
  );
}
