import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { QuizContext } from "../../Providers/QuizProvider";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";

export default function MyQuizzesBox({ quizzes, index, handleDeleteQuiz }) {
  const { difficulty, email, numQuestions, quiz, score, topic, _id, timer } =
    quizzes;
  const { handleTryAgainQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleTryAgain = () => {
    handleTryAgainQuiz(quiz, topic, numQuestions, difficulty, _id, timer);
    navigate("/quiz");
  };
  const downloadQuesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Topic: ${topic}`, 20, 20);

    let y = 30;
    doc.setFontSize(12);

    quiz.forEach((q, index) => {
      // Check if there's space for a new question, else add a new page
      if (y + 20 > 280) {
        doc.addPage();
        y = 20; // Reset y position for new page
      }

      doc.text(`${index + 1}. ${q.question}`, 20, y);
      y += 10;

      doc.text("Options:", 20, y);
      y += 6;

      q.answers.forEach((ans, i) => {
        const optionLetter = String.fromCharCode(97 + i); // Convert 0 -> 'a', 1 -> 'b', etc.
        doc.text(`${optionLetter}) ${ans}`, 30, y); // Indent options for clarity
        y += 6;
      });

      // Move correct answer to the next page if necessary
      if (y + 10 > 280) {
        doc.addPage();
        y = 20;
      }

      y += 10; // Add extra spacing before the next question
    });

    doc.save("quizQuestion.pdf");
  };
  const downloadAnsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${topic} Quiz Answers`, 20, 20);

    let y = 30;
    doc.setFontSize(12);

    quiz.forEach((q, index) => {
      // Check if there's space for a new question, else add a new page
      if (y + 20 > 280) {
        doc.addPage();
        y = 20; // Reset y position for new page
      }

      doc.text(`${index + 1}. ${q.question}`, 20, y);
      y += 10;

      // Move correct answer to the next page if necessary
      if (y + 10 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(`Correct Answer: ${q.correct}`, 20, y);
      y += 15; // Add extra spacing before the next question
    });

    doc.save("quizAnswer.pdf");
  };
  return (
    <div>
      <div className="container mx-auto my-2 rounded-sm">
        <div className="border-2 flex items-center justify-between px-4 py-2 ">
          <div>
            {index + 1}.{" "}
            <span className="font-bold mx-2 border-4 px-2 border-accent p-1 rounded-3xl cursor-pointer">
              <NavLink to={`/topics/${topic}`}>{topic}</NavLink>
            </span>
          </div>

          <div>
            score:{" "}
            <span className="font-bold text-xl text-green-700">
              {score}/{numQuestions}
            </span>
          </div>

          <div className="space-x-4 font-semibold">
            <button className="border-4 px-2 border-primary p-1 rounded-3xl">
              {difficulty}
            </button>
            <button
              className="border-4 px-2 border-accent p-1 rounded-3xl "
              onClick={downloadQuesPDF}
            >
              Question <IoMdDownload className="inline" />
            </button>
            <button
              className="border-4 px-2 border-accent p-1 rounded-3xl "
              onClick={downloadAnsPDF}
            >
              <span>Answer</span> <IoMdDownload className="inline" />
            </button>
            <button
              className="border-4 px-2 border-red-600 bg-red-500/10 p-1 rounded-3xl hover:bg-red-500 hover:text-white "
              onClick={() => handleDeleteQuiz(_id)}
            >
              delete
            </button>
            <button
              className="border-4 px-2 border-green-600 bg-green-600/10 p-1 rounded-3xl hover:bg-green-500 hover:text-white"
              onClick={handleTryAgain}
            >
              try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
