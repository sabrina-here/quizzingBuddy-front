import React, { useContext } from "react";
import { QuizContext } from "../../Providers/QuizProvider";

export default function Quiz() {
  const [quiz, setQuiz] = useContext(QuizContext);
  console.log(quiz);

  return <div>Quiz</div>;
}
