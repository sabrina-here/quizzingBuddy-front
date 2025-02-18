import useAxiosSecure from "../../Hooks/useAxiosSecure";

const fetchQuizzesLoader = async ({ params }) => {
  const token = localStorage.getItem("token");
  const axiosSecure = useAxiosSecure();

  try {
    const response = await axiosSecure.get(
      `/getQuizzes?topic=${params.topic}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // The fetched quizzes will be available in the component
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load quizzes. Please Try again",
    });
  }
};

export default fetchQuizzesLoader;
