import React, { useContext, useState } from "react";
import { QuizContext } from "../../Providers/QuizProvider";

export default function Answer({ a, correct }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [calculateCorrectAnswers] = useContext(QuizContext);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
    if (selectedAnswer == correct) {
      console.log("selected ans and correct", selectedAnswer, correct);
      calculateCorrectAnswers();
    }
  };

  return (
    <div>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="answers"
          value={a} // Set the value to the current answer
          className="text-blue-600 focus:ring-primary"
          checked={selectedAnswer === a} // Check if this answer is selected
          onChange={handleAnswerChange} // Update state on change
        />
        <span className="text-gray-700">{a}</span>
      </label>
    </div>
  );
}
