import React, { useContext, useRef, useState } from "react";
import Modal from "./Modal";
import { IoClose } from "react-icons/io5";
import { QuizContext } from "../Providers/QuizProvider";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { authContext } from "../Providers/AuthProvider";
import PreferredTopicBox from "../Pages/UserProfile/PreferredTopicBox";
import Loader from "./Loader";

export default function GenerateQuizModal({ isModalOpen, closeModal }) {
  const { handleQuiz } = useContext(QuizContext);
  const [openNextModal, setOpenNextModal] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [preferredTopics, setPreferredTopics] = useState([]);
  const [preferredTopicsFound, setPreferredTopicsFound] = useState(true);
  const navigate = useNavigate();
  const topicRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);

  const {
    data: topicsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["preferredTopics"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.get(`/preferredTopics/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setPreferredTopics(data.data.preferredTopics);
      if (data.message === "No preferences found for this user") {
        setPreferredTopicsFound(false);
      }
      return data;
    },
  });

  const handleOpenNextModal = () => {
    setTopicName(topicRef.current.value);
    closeModal();
    setOpenNextModal(true);
  };
  const handleCloseNextModal = () => setOpenNextModal(false);

  const handleSelectTopic = (t) => {
    setTopicName(t);
    closeModal();
    setOpenNextModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const topic = topicName;
    const difficulty = form.difficulty.value;
    const numQuestions = form.questions.value;
    const timer = form.timer.value;
    // console.log(topic, difficulty, numQuestions, timer);
    handleQuiz(topic, numQuestions, difficulty, timer);

    form.reset();
    closeModal();
    navigate("/quiz");
  };
  return (
    <div>
      <Modal show={isModalOpen} onClose={closeModal}>
        <div className="">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold ">Select Your Quiz Topic</h2>
            <button
              onClick={closeModal}
              className="px-3 py-1 border-2 border-red-600 text-dark rounded-lg hover:bg-red-700 hover:text-white"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
          <div className="my-4">
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700"
            >
              Topic
            </label>
            <input
              name="topic"
              type="text"
              ref={topicRef}
              placeholder="Enter your topic to generate quiz"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="">
            {preferredTopicsFound && (
              <div>
                <div className=" w-full my-4 flex items-center justify-center">
                  <hr className="border w-[40%] mx-2" />
                  <span>OR </span>
                  <hr className="border w-[40%] mx-2" />
                </div>
                <h2 className="text-xl font-bold ">
                  Select from preferred topics
                </h2>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <div>
                      {preferredTopicsFound && (
                        <div className="flex flex-wrap gap-4 my-3 max-h-[200px] overflow-y-auto">
                          {preferredTopics.map((topic, index) => (
                            <div
                              key={index}
                              onClick={() => handleSelectTopic(topic)}
                              className="border-2 border-green-500  py-1 rounded-md hover:bg-light/30 hover:font-semibold hover:cursor-pointer  flex justify-between items-center"
                            >
                              <span className="px-2">{topic} </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => handleOpenNextModal()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </Modal>

      <Modal show={openNextModal} onClose={handleCloseNextModal}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold ">Select Your Quiz Topic</h2>
          <button
            onClick={handleCloseNextModal}
            className="px-3 py-1 border-2 border-red-600 text-dark rounded-lg hover:bg-red-700 hover:text-white"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
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
