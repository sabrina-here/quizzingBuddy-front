import React, { useContext, useEffect, useState } from "react";
import QaBlock from "./QaBlock";
import { QuizContext } from "../../Providers/QuizProvider";
import { useNavigate } from "react-router";
import Modal from "../../Components/Modal";
import { IoClose } from "react-icons/io5";
import { authContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import QuizTimer from "../../Components/QuizTimer";
import GenerateQuizModal from "../../Components/GenerateQuizModal";

export default function Quiz() {
  const {
    quiz = [],
    quizReset,
    topic,
    numQuestions,
    difficulty,
    timer,
    setTimer,
    quizDuration,
    setQuizDuration,
    loading,
    updateQuizId,
    handleSetQuizDuration,
    submitted,
    handleUpdateSubmitStatus,
  } = useContext(QuizContext);

  const { user } = useContext(authContext);
  const axiosSecure = useAxiosSecure();
  const [correct, setCorrect] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [penaltyApplied, setPenaltyApplied] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateQuiz = () => {
    setCorrect(0);
    setSelectedAnswers({});
    handleUpdateSubmitStatus(false);
    setPenaltyApplied(0);
    setStopTimer(false);
    setTimeUp(false);
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
    handleUpdateSubmitStatus(false);
    setStopTimer(true);
    const penalty = penaltyApplied;
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.patch(
        `/updateQuiz/${updateQuizId}`,
        { score: correct, penalty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating quiz score:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating quiz score. Please Try again",
      });
    }
    localStorage.removeItem("quizData");
    setPenaltyApplied(0);
  };

  const handleQuizSubmit = async () => {
    handleUpdateSubmitStatus(false);
    setStopTimer(true);
    // calculate result (already done while selecting)
    // post data to db with result , email, no of q, difficulty and topic if user present

    if (user?.email) {
      const userQuizData = {
        email: user.email,
        topic,
        timer: quizDuration,
        penalty: penaltyApplied,
        score: correct,
        numQuestions,
        difficulty,
        quiz,
      };
      console.log(userQuizData);
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
    setPenaltyApplied(0);
  };

  const handleQuizDiscard = () => {
    localStorage.removeItem("quizData");
    quizReset();
    navigate("/");
  };

  const handleTimeUp = () => {
    if (!submitted) {
      setTimeUp(true);
      Swal.fire("time up");
      updateQuizId ? handleQuizUpdate() : handleQuizSubmit();
    }
  };

  useEffect(() => {
    const handleTabChange = () => {
      if (document.hidden && !submitted) {
        console.log("submitted: ", submitted);
        if (quizDuration === 0) {
          if (!Swal.isVisible()) {
            Swal.fire(
              "You switched tabs! Your timer is set to 1 minute as a penalty"
            );
          }
          handleSetQuizDuration(60);
          setPenaltyApplied((prev) => prev + 1);
          return;
        }

        setPenaltyApplied((prev) => prev + 1); // Correct way to update state
        timer && setTimer((prev) => Math.ceil(prev / 2)); // Ensures timer doesn't go below 1
        if (!Swal.isVisible()) {
          Swal.fire("You switched tabs! Your timer is halved as a penalty");
        }
      }
    };

    document.addEventListener("visibilitychange", handleTabChange);

    return () => {
      document.removeEventListener("visibilitychange", handleTabChange);
    };
  }, []);

  if (loading) return <Loader></Loader>;

  return (
    <div className="lg:max-w-[90%] mx-auto">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <QuizTimer
              stopTimer={stopTimer}
              onTimeUp={handleTimeUp}
              quizDuration={quizDuration}
            />
          </div>
          <div>
            {submitted && (
              <div className=" text-end p-2 bg-light/40 text-xl">
                {" "}
                correct :{" "}
                <span className="text-green-600 font-semibold">
                  {correct * Math.pow(0.5, penaltyApplied)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
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
          Generate New quiz
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
              Submit
            </button>
          ) : (
            <button
              className={`p-2 mx-2 my-4 border-2 px-5 rounded-lg font-medium text-lg ${
                submitted
                  ? "bg-medium text-light"
                  : "border-primary  bg-primary/10  hover:bg-primary/20 hover:text-xl"
              } `}
              onClick={handleQuizSubmit}
              disabled={submitted}
            >
              Submit
            </button>
          )}
        </>
      </div>
      <GenerateQuizModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
