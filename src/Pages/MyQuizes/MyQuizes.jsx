import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function MyQuizes() {
  const [quizzes, setQuizzes] = useState([]);

  const axiosSecure = useAxiosSecure();

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosSecure.get(`/getMyQuizzes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuizzes(response.data.quizzes);
      console.log(response);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setQuizzes([]); // Clear quizzes if there's an error
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div>
      <div>
        <h3>Quizzes </h3>
        <ul>
          {quizzes.length > 0 ? (
            quizzes.map((quiz, index) => (
              <li key={index}>
                Score: {quiz.score} | Difficulty: {quiz.difficulty} | Questions:{" "}
                {quiz.numQuestions}
              </li>
            ))
          ) : (
            <p>No quizzes found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
