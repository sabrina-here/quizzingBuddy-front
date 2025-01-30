import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

export default function QaBlock({ blockData, onAnswerChange, submitted }) {
  const { question, answers, correct } = blockData;

  // Local state for selected answer (optional, for controlled input)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctColor, setCorrectColor] = useState(false);

  const handleAnswerChange = (e) => {
    const answer = e.target.value;
    setSelectedAnswer(answer); // Update local state
    onAnswerChange(answer, correct); // Notify parent of the change
  };

  useEffect(() => {
    if (submitted) {
      if (selectedAnswer === correct) setCorrectColor(true);
    }
  }, [submitted]);

  return (
    <div className="m-3">
      <div className="border-2 border-light rounded-md">
        <div
          className={`bg-primary/10  flex justify-between ${
            submitted && (correctColor ? `bg-green-600/20` : `bg-red-600/20`)
          }`}
        >
          <div className="font-medium text-lg text-justify p-2 ">
            <p>{question}</p>
          </div>
          <div className="text-3xl p-2 ">
            {submitted &&
              (correctColor ? (
                <TiTick className="text-green-600" />
              ) : (
                <IoCloseSharp className="text-red-600" />
              ))}
          </div>
        </div>
        <div className={``}>
          {answers.map((a, index) => (
            <div
              className={` ${submitted && a === correct && `bg-green-600/30`}`}
              key={index}
            >
              <label
                className={`p-2 flex items-center space-x-2 cursor-pointer ${
                  !submitted && `hover:text-lg hover:bg-green-500/10`
                }`}
              >
                <input
                  type="radio"
                  name={`answers-${question}`} // Unique name for each question
                  value={a}
                  className="text-blue-600 focus:ring-primary "
                  checked={selectedAnswer === a}
                  onChange={handleAnswerChange}
                  disabled={submitted}
                />
                <span className="text-gray-700">{a}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
