import React, { useContext, useEffect, useState } from "react";
import QaBlock from "./QaBlock";
import { QuizContext } from "../../Providers/QuizProvider";
import { useNavigate } from "react-router";
import Modal from "../../Components/Modal";
import fetchQuizQuestions from "../../Components/fetchQuizQuestions";
import { IoClose } from "react-icons/io5";
import { authContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function Quiz() {
  const {
    quiz = [],
    topic,
    numQuestions,
    difficulty,
    loading,
    handleQuiz,
    updateQuizId,
  } = useContext(QuizContext);

  const { user } = useContext(authContext);
  const axiosSecure = useAxiosSecure();
  const [correct, setCorrect] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateQuiz = () => {
    setCorrect(0);
    setSelectedAnswers({});
    setSubmitted(false);
    openModal();
  };

  const handleAnswerChange = (questionIndex, selectedAnswer, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }));
    if (selectedAnswer === correctAnswer) {
      setCorrect(correct + 1);
    }
  };

  const handleQuizUpdate = async () => {
    setSubmitted(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.patch(
        `/updateQuiz/${updateQuizId}`,
        { score: correct },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error updating quiz score:", error);
    }
    localStorage.removeItem("quizData");
  };

  const handleQuizSubmit = async () => {
    setSubmitted(true);
    // calculate result (already done while selecting)
    // post data to db with result , email, no of q, difficulty and topic if user present
    if (user?.email) {
      const userQuizData = {
        email: user.email,
        topic,
        score: correct,
        numQuestions,
        difficulty,
        quiz,
      };
      const token = localStorage.getItem("token");
      const response = await axiosSecure.post("/saveQuiz", userQuizData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response2 = await axiosSecure.post(
        "/saveTopic",
        { email: user.email, topic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      Swal.fire({
        position: "top-end",
        text: "Login to Save your quizzes and track your progress",
        width: 300,
        showCloseButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/signup");
        }
      });
    }
    // remove quizData from localstorage
    localStorage.removeItem("quizData");
  };

  const handleQuizDiscard = () => {
    localStorage.removeItem("quizData");
    setQuiz(null);
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const topic = form.topic.value;
    const difficulty = form.difficulty.value;
    const numQuestions = form.questions.value;

    handleQuiz(topic, numQuestions, difficulty);

    form.reset();
    closeModal();
    navigate("/quiz");
  };

  if (loading) return <div>loading</div>;

  return (
    <div className="lg:max-w-[90%] mx-auto">
      <div className="">
        {/* header to show result */}
        {submitted && (
          <div className=" text-end p-2 bg-light/40 text-xl">
            {" "}
            correct :{" "}
            <span className="text-green-600 font-semibold">{correct}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 container mx-auto">
        {console.log(quiz)}
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
          className={`p-2 mx-2 my-4 border-2 px-5 rounded-lg font-medium text-lg  ${
            submitted
              ? "bg-medium text-light"
              : "border-red-600  bg-red-600/10 hover:bg-red-600/20 hover:text-xl"
          } `}
          onClick={handleQuizDiscard}
          disabled={submitted}
        >
          Discard
        </button>
        <button
          className="p-2 mx-2 my-4 border-2 border-accent bg-accent/10 hover:bg-accent/20 hover:text-xl px-5 rounded-lg font-medium text-lg"
          onClick={handleGenerateQuiz}
        >
          Generate quiz
        </button>
        <>
          {updateQuizId ? (
            <button
              className={`p-2 mx-2 my-4 border-2 px-5 rounded-lg font-medium text-lg ${
                submitted
                  ? "bg-medium text-light"
                  : "border-primary  bg-primary/10  hover:bg-primary/20 hover:text-xl"
              } `}
              onClick={handleQuizUpdate}
              disabled={submitted}
            >
              up Submit
            </button>
          ) : (
            <button
              className={`p-2 mx-2 my-4 border-2 px-5 rounded-lg font-medium text-lg ${
                submitted
                  ? "bg-medium text-light"
                  : "border-primary  bg-primary/10  hover:bg-primary/20 hover:text-xl"
              } `}
              onClick={() => handleQuizSubmit()}
              disabled={submitted}
            >
              Submit
            </button>
          )}
        </>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold ">Select Your Quiz Topic</h2>
          <button
            onClick={closeModal}
            className="px-3 py-1 border-2 border-red-600 text-dark rounded-lg hover:bg-red-700 hover:text-white"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700"
            >
              Topic
            </label>
            <input
              name="topic"
              type="text"
              placeholder="Enter your topic to generate quiz"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Difficulty
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Easy</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Medium</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Hard</span>
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="questions"
              className="block text-sm font-medium text-gray-700"
            >
              Select Number of Questions
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="questions"
                  value="5"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">5</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="questions"
                  value="8"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">8</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="questions"
                  value="10"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">10</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Quiz
          </button>
        </form>
      </Modal>
    </div>
  );
}
