import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyQuizzesBox from "./MyQuizzesBox";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

export default function MyQuizes() {
  const [quizzes, setQuizzes] = useState([]);

  const axiosSecure = useAxiosSecure();

  const token = localStorage.getItem("token");
  // const fetchQuizzes = async () => {
  //   try {

  //     const response = await axiosSecure.get(`/getMyQuizzes`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setQuizzes(response.data.quizzes);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching quizzes:", error);
  //     setQuizzes([]); // Clear quizzes if there's an error
  //   }
  // };

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
  else {
    setQuizzes(data.quizzes);
  }

  const deleteQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.delete(`/deleteQuiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      // Optionally, refresh quiz list after deletion
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
      // denyButtonText: `cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuiz(id);
      }
    });
  };

  // useEffect(() => {
  //   fetchQuizzes();
  // }, []);
  return (
    <div>
      <div>
        <div>
          {quizzes ? (
            quizzes.map((quiz, index) => (
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
