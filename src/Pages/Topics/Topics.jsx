import { useLoaderData } from "react-router";
import TopicQuizBox from "./TopicQuizBox";

export default function Topics() {
  const topicQuizData = useLoaderData();
  let quizzes = topicQuizData.quizzes;
  console.log(topicQuizData.quizzes);
  const total = quizzes.reduce(
    (acc, quiz) => {
      acc.totalScore += quiz.score;
      acc.totalQuestions += quiz.numQuestions;
      return acc;
    },
    { totalScore: 0, totalQuestions: 0 }
  );
  console.log("total", total);
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
  console.log("difficulty percentage", difficultyPercentage);
  const totalScorePercentage = (total.totalScore / total.totalQuestions) * 100;
  const easyPercentage =
    (difficultyPercentage.totalEasyScore / difficultyPercentage.totalEasyQ) *
    100;
  const mediumPercentage =
    (difficultyPercentage.totalMediumScore /
      difficultyPercentage.totalMediumQ) *
    100;
  const hardPercentage =
    (difficultyPercentage.totalHardScore / difficultyPercentage.totalHardQ) *
    100;
  const topicName = quizzes[0].topic;
  console.log(hardPercentage);

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center px-2 py-1">
        <div>
          Topic :{" "}
          <span className="font-semibold text-lg uppercase">{topicName}</span>{" "}
        </div>
        <div>
          score percentage:{" "}
          <span className="font-bold text-xl text-green-700">
            {totalScorePercentage || 0}%
          </span>
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
        {quizzes.map((q, index) => (
          <div key={q._id}>
            <TopicQuizBox index={index} q={q} />
          </div>
        ))}
      </div>
    </div>
  );
}
