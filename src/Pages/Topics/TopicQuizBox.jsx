import React from "react";

export default function TopicQuizBox({ q, index }) {
  const { difficulty, email, numQuestions, quiz, score, topic } = q;

  return (
    <div className="container mx-auto my-2 rounded-sm">
      <div className="border-2 flex items-center justify-between px-4 py-2 ">
        <div>{index + 1}</div>
        <div>
          score:{" "}
          <span className="font-bold text-xl text-green-700">{score}</span>
        </div>
        <div className="space-x-4 font-semibold">
          <button className="border-4 px-2 border-accent p-1 rounded-3xl">
            {difficulty}
          </button>
          <button className="border-4 px-2 border-red-600 bg-red-500/10 p-1 rounded-3xl hover:bg-red-500 hover:text-white ">
            delete
          </button>
          <button className="border-4 px-2 border-green-600 bg-green-600/10 p-1 rounded-3xl hover:bg-green-500 hover:text-white">
            try again
          </button>
        </div>
      </div>
    </div>
  );
}
