import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyQuizzesBox from "./MyQuizzesBox";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

export default function MyQuizes() {
  const [quizzes, setQuizzes] = useState([]);
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("token");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getMyQuizzes"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/getMyQuizzes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data);
      return data;
    },
  });
  if (isLoading) return <div>loading</div>;
  if (data.message === "No quizzes found for this user.")
    return <div>{data.message}</div>;

  const deleteQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.delete(`/deleteQuiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      refetch();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleDeleteQuiz = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This action cannot be reversed",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuiz(id);
      }
    });
  };

  return (
    <div>
      <div>
        <div>
          {data.quizzes ? (
            data.quizzes.map((quiz, index) => (
              <MyQuizzesBox
                quizzes={quiz}
                index={index}
                key={index}
                handleDeleteQuiz={handleDeleteQuiz}
              />
            ))
          ) : (
            <p>No quizzes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
