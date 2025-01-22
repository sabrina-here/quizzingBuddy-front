import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Modal from "../../Components/Modal";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import axios from "axios";
import fetchQuizQuestions from "../../Components/fetchQuizQuestions";
import { useNavigate } from "react-router";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [user, setUser] = useState(true);
  const [quizData, setQuizData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(() => {
      if (!user) {
        Swal.fire({
          position: "top-end",
          text: "Login to Save your quizzes and track your progress",
          width: 300,
          showCloseButton: true,
          confirmButtonText: "Login",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
    }, 30000); // 60000ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const topic = form.topic.value;
    const difficulty = form.difficulty.value;
    const numQuestions = form.questions.value;

    console.log(topic, difficulty, numQuestions);
    await fetchQuizQuestions(topic, difficulty, numQuestions);

    form.reset();
    closeModal();
    navigate("/quiz");
  };

  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="h-[300px] w-[500px] ">
        <DotLottieReact
          // src="https://lottie.host/8921549b-85f8-4590-9152-897fabedd866/6Oisqb3gNI.lottie"
          src="https://lottie.host/48199fa6-422c-40df-85db-d33a59be8d82/ljuqoVQrQf.lottie"
          // src="https://lottie.host/ed8d9b0b-91ce-4720-94b5-fcb570a87c9e/JwwVzyxMu2.lottie"
          loop
          autoplay
        />
      </div>
      <div className="text-center">
        <p>
          Create your own quizzes to assess knowledge,
          <br /> gather leads and boost learning
        </p>
        <button
          className="border-4 border-accent p-2 rounded-lg my-3 font-semibold"
          onClick={openModal}
        >
          + Create Your First Quiz
        </button>
      </div>
      <div>{quizData}</div>

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
                  value="10"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">10</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="questions"
                  value="15"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">15</span>
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
