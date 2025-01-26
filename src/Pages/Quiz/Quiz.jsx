import React, { useContext, useState } from "react";
import QaBlock from "./QaBlock";
import { QuizContext } from "../../Providers/QuizProvider";

export default function Quiz() {
  const [quiz] = useContext(QuizContext);
  const [correct, setCorrect] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, selectedAnswer, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }));
    if (selectedAnswer === correctAnswer) {
      setCorrect(correct + 1);
    }
  };

  console.log(correct);
  console.log("All Selected Answers:", selectedAnswers);

  const handleQuizSubmit = () => {
    setSubmitted(true);
  };
  console.log(submitted);

  return (
    <div className="lg:max-w-[90%] mx-auto">
      <div className="grid grid-cols-2 gap-4 container mx-auto">
        {quiz.map((q, index) => (
          <div key={index}>
            <QaBlock
              blockData={q}
              onAnswerChange={(selectedAnswer, correctAnswer) =>
                handleAnswerChange(index, selectedAnswer, correctAnswer)
              }
              submitted={submitted}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto text-center">
        <button
          className="p-2 my-4 border-2 border-primary px-5 rounded-lg font-medium bg-primary/10 text-lg hover:bg-primary/20 hover:text-xl"
          onClick={handleQuizSubmit}
          disabled={!submitted}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
