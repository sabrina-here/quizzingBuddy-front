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
    throw new Response("Failed to load quizzes", { status: 500 });
  }
};

export default fetchQuizzesLoader;
