import React, { useContext, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Modal from "../../Components/Modal";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { authContext } from "../../Providers/AuthProvider";
import { QuizContext } from "../../Providers/QuizProvider";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user, handleShowLogin } = useContext(authContext);
  const { handleQuiz } = useContext(QuizContext);

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
            handleShowLogin();
            navigate("/signup");
          }
        });
      }
    }, 30000); // 60000ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  const handleOpenModal = () => {
    if (user) {
      openModal();
    } else {
      Swal.fire({
        title: "Please Login to save your quizzes and track your progress.",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Login",
        denyButtonText: `Not now`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleShowLogin();
          navigate("/signup");
        } else if (result.isDenied) {
          openModal();
        }
      });
    }
  };

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
    <div className=" flex flex-col justify-center items-center custom-gradient">
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
          onClick={handleOpenModal}
        >
          {user ? "Generate quiz" : "+ Create Your First Quiz"}
        </button>
      </div>

      {/* -------------- special features ---------------- */}
      <div className="w-full  mt-10">
        <div className="container mx-auto  ">
          <div className="lg:max-w-[70%] mx-auto">
            <div className="text-center font-bold text-2xl my-3 underline underline-offset-8 text-primary">
              Special Features
            </div>
            <div className="grid  grid-cols-2 gap-6 my-10 ">
              <div className="relative w-[400px] h-[200px] mx-auto  p-1 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                <div className="w-[390px] h-[190px] p-4 m-auto bg-white flex flex-col justify-center items-center rounded-lg  mask mask-squircle">
                  <p className="font-bold text-xl mb-2">Create Quizzes</p>
                  <p>
                    Design personalized quizzes with multiple-choice questions,
                    timers, and difficulty levels tailored to your needs
                  </p>
                </div>
              </div>
              <div className="relative w-[400px] h-[200px] mx-auto  p-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500/50">
                <div className="w-[390px] h-[190px] p-4 m-auto bg-white flex flex-col justify-center items-center rounded-lg  mask mask-squircle">
                  <p className="font-bold text-xl mb-2">
                    AI-Powered Question Generator
                  </p>
                  <p>
                    Save time with AI-assisted question creation for quizzes
                    across various topics and difficulty levels.
                  </p>
                </div>
              </div>
              <div className="relative w-[400px] h-[200px] mx-auto  p-1 rounded-lg bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                <div className="w-[390px] h-[190px] p-4 m-auto bg-white flex flex-col justify-center items-center rounded-lg  mask mask-squircle">
                  <p className="font-bold text-xl mb-2">Progress Tracking</p>
                  <p>
                    track your progress on various topics and improve your
                    skills
                  </p>
                </div>
              </div>
              <div className="relative w-[400px] h-[200px] mx-auto  p-1 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-primary/50">
                <div className="w-[390px] h-[190px] p-4 m-auto bg-white flex flex-col justify-center items-center rounded-lg  mask mask-squircle">
                  <p className="font-bold text-xl mb-2">Offline Mode</p>
                  <p>
                    Download quizzes as PDFs for offline use, making Quizzing
                    Buddy accessible anywhere, anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
