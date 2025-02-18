import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router";
import { QuizContext } from "../Providers/QuizProvider";
import { IoClose } from "react-icons/io5";

export default function Message({ message }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleQuiz } = useContext(QuizContext);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const topic = form.topic.value;
    const difficulty = form.difficulty.value;
    const numQuestions = form.questions.value;
    const timer = form.timer.value;

    handleQuiz(topic, numQuestions, difficulty, timer);

    form.reset();
    closeModal();
    navigate("/quiz");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[400px] h-[200px] border-4 border-primary/20 uppercase rounded-sm flex flex-col justify-center items-center text-lg font-semibold">
        <div>{message}</div>
        <div>
          {" "}
          <button
            className="p-2 mx-2 my-4 border-2 border-accent bg-accent/10 hover:bg-accent/20 hover:text-xl px-5 rounded-lg font-medium text-lg"
            onClick={() => openModal()}
          >
            Generate quiz
          </button>
        </div>
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
            <div className="mt-2 space-y-2 grid grid-cols-3">
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
          <div>
            <label
              htmlFor="timer"
              className="block text-sm font-medium text-gray-700"
            >
              Select Timer (minutes)
            </label>
            <div className="mt-2 space-y-2 grid grid-cols-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timer"
                  value="180"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">3</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timer"
                  value="300"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">5</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timer"
                  value="480"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">8</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timer"
                  value="600"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">10</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timer"
                  value="0"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">No Timer</span>
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
