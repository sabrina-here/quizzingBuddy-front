import { useLoaderData, useNavigate } from "react-router";
import TopicQuizBox from "./TopicQuizBox";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function Topics() {
  const topicQuizData = useLoaderData();
  let quizzes = topicQuizData.quizzes;

  if (!quizzes) return <div>No quizzes on this topic</div>;
  else {
    const axiosSecure = useAxiosSecure();
    const total = quizzes.reduce(
      (acc, quiz) => {
        acc.totalScore += quiz.score;
        acc.totalQuestions += quiz.numQuestions;
        return acc;
      },
      { totalScore: 0, totalQuestions: 0 }
    );
    const difficultyPercentage = quizzes.reduce(
      (acc, quiz) => {
        if (quiz.difficulty === "easy") {
          acc.totalEasyScore += quiz.score;
          acc.totalEasyQ += quiz.numQuestions;
        }
        if (quiz.difficulty === "medium") {
          acc.totalMediumScore += quiz.score;
          acc.totalMediumQ += quiz.numQuestions;
        }
        if (quiz.difficulty === "hard") {
          acc.totalHardScore += quiz.score;
          acc.totalHardQ += quiz.numQuestions;
        }
        return acc; // Ensure accumulator is always returned
      },
      {
        totalEasyQ: 0,
        totalEasyScore: 0,
        totalMediumQ: 0,
        totalMediumScore: 0,
        totalHardQ: 0,
        totalHardScore: 0,
      } // Provide initial accumulator value
    );
    const totalScorePercentage =
      total.totalScore && total.totalQuestions
        ? parseFloat(
            ((total.totalScore / total.totalQuestions) * 100).toFixed(2)
          )
        : 0;

    const easyPercentage = parseFloat(
      (
        (difficultyPercentage.totalEasyScore /
          difficultyPercentage.totalEasyQ) *
        100
      ).toFixed(2)
    );
    const mediumPercentage = parseFloat(
      (
        (difficultyPercentage.totalMediumScore /
          difficultyPercentage.totalMediumQ) *
        100
      ).toFixed(2)
    );
    const hardPercentage = parseFloat(
      (
        (difficultyPercentage.totalHardScore /
          difficultyPercentage.totalHardQ) *
        100
      ).toFixed(2)
    );
    const topicName = quizzes[0].topic;

    const navigate = useNavigate();

    const deleteQuiz = async (quizId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosSecure.delete(`/deleteQuiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Optionally, refresh quiz list after deletion
        navigate(0);
      } catch (error) {
        console.error("Error deleting quiz:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error deleting quiz. Please Try again",
        });
      }
    };

    const handleDeleteQuiz = (id) => {
      Swal.fire({
        title: "Are you sure you want to delete?",
        text: "This action cannot be reversed",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
        // denyButtonText: `cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteQuiz(id);
        }
      });
    };

    return (
      <div className="container lg:max-w-[80%] mx-auto">
        <div className=" flex justify-between items-center px-2 py-1 my-7">
          <div>
            Topic :{"   "}
            <span className="font-bold text-lg uppercase ms-2">
              {" "}
              {topicName}
            </span>{" "}
          </div>
          <div>
            <div>
              {" "}
              score percentage:{" "}
              <span className="font-bold text-xl text-green-700">
                {totalScorePercentage || 0}%
              </span>
            </div>
            <div className="w-full bg-gray-300 h-2 rounded">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: `${totalScorePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="space-x-6 flex">
            <div>
              easy:{" "}
              <span className="font-bold text-xl text-green-700">
                {easyPercentage || 0}%
              </span>
            </div>
            <div>
              medium:{" "}
              <span className="font-bold text-xl text-green-700">
                {mediumPercentage || 0}%
              </span>
            </div>
            <div>
              hard:{" "}
              <span className="font-bold text-xl text-green-700">
                {hardPercentage || 0}%
              </span>
            </div>
          </div>
        </div>
        <div>
          {quizzes.length > 0 ? (
            quizzes.map((q, index) => (
              <div key={q._id}>
                <TopicQuizBox
                  index={index}
                  q={q}
                  handleDeleteQuiz={handleDeleteQuiz}
                />
              </div>
            ))
          ) : (
            <div>No quizzes on this topic </div>
          )}
        </div>
      </div>
    );
  }
}
