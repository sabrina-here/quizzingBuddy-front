import { createContext, useEffect, useState } from "react";
import fetchQuizQuestions from "../Components/fetchQuizQuestions";

export const QuizContext = createContext();

export default function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState([]);

  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateQuizId, setUpdateQuizId] = useState();
  const [timer, setTimer] = useState(null);
  const [quizDuration, setQuizDuration] = useState(0);

  const handleQuiz = async (t, n, d, time) => {
    setTopic(t);
    setNumQuestions(n);
    setDifficulty(d);
    setLoading(true); // Set loading to true before fetching
    setTimer(time);
    setQuizDuration(time);

    try {
      const response = await fetchQuizQuestions(t, n, d);
      setQuiz(response);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error fetching quiz. Please Try again",
      });
    } finally {
      setLoading(false); // Ensure loading is false after fetching, even if an error occurs
    }
  };

  const handleTryAgainQuiz = (q, t, n, d, id, time) => {
    setTopic(t);
    setNumQuestions(n);
    setDifficulty(d);
    setLoading(true);
    setQuiz(q);
    setUpdateQuizId(id);
    setTimer(time);
    setQuizDuration(time);
    setLoading(false);
  };

  const quizReset = () => {
    setQuiz([]);
  };

  const quizInfo = {
    quiz,
    topic,
    numQuestions,
    difficulty,
    timer,
    setTimer,
    quizDuration,
    handleQuiz,
    loading,
    handleTryAgainQuiz,
    updateQuizId,
    quizReset,
  };

  return (
    <QuizContext.Provider value={quizInfo}>{children}</QuizContext.Provider>
  );
}
