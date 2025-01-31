import React from "react";
import { NavLink } from "react-router";

export default function MyTopicsBox({ d, index, handleDeleteTopic }) {
  const {
    topic,
    score,
    numQuestions,
    total_quizzes,
    difficulty_easy,
    difficulty_medium,
    difficulty_hard,
  } = d;

  const percentScore = (score / numQuestions) * 100;
  return (
    <div className="container mx-auto my-2 rounded-sm">
      <div className="border-2 flex items-center justify-between px-4 py-2 ">
        <div>
          {index + 1}.
          <span className="font-bold text-lg uppercase ms-2"> {topic}</span>{" "}
        </div>
        <div>
          score:{" "}
          <span className="ms-1 font-bold text-xl text-green-700">
            {percentScore || 0}%
          </span>
        </div>
        <div>
          quizzes:{" "}
          <span className="ms-1 font-bold text-xl">{total_quizzes}</span>
        </div>
        <div className="space-x-4 font-semibold">
          <button
            className="border-4 px-2 border-red-600 bg-red-500/10 p-1 rounded-3xl hover:bg-red-500 hover:text-white "
            onClick={() => handleDeleteTopic(topic)}
          >
            delete
          </button>
          <button className="border-4 px-2 border-green-600 bg-green-600/10 p-1 rounded-3xl hover:bg-green-500 hover:text-white">
            <NavLink to={`/topics/${topic}`}>view all</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
