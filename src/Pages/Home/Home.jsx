import React, { useContext, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Modal from "../../Components/Modal";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { authContext } from "../../Providers/AuthProvider";
import { QuizContext } from "../../Providers/QuizProvider";
import GenerateQuizModal from "../../Components/GenerateQuizModal";

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
      <GenerateQuizModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      ></GenerateQuizModal>
    </div>
  );
}
