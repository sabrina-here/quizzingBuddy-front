import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyQuizzesBox from "./MyQuizzesBox";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

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
      return data;
    },
  });
  if (isLoading) return <Loader />;
  if (data.message === "No quizzes found for this user.")
    return <Message message={"you do not have any quizzes"} />;

  const deleteQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.delete(`/deleteQuiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        <div className="container lg:max-w-[80%] mx-auto">
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
