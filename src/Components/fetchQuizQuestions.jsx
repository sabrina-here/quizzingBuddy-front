import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const fetchQuizQuestions = async (topic, difficulty, numQuestions) => {
  const axiosSecure = useAxiosSecure();
  try {
    const response = await axiosSecure.post("/api/generate-questions", {
      topic,
      difficulty,
      numQuestions,
    });

    let responseData = response.data;

    // Find the first occurrence of '[' and the last occurrence of ']'
    const startIndex = responseData.indexOf("[");
    const endIndex = responseData.lastIndexOf("]") + 1; // Include the closing bracket

    if (startIndex !== -1 && endIndex !== -1) {
      responseData = responseData.slice(startIndex, endIndex).trim(); // Extract the content within the brackets
    }

    localStorage.setItem("quizData", responseData);
    return responseData;
  } catch (error) {
    console.error(
      "Error fetching quiz questions:",
      error.response?.data || error.message
    );
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to fetch quiz questions. Please Try again",
    });
  }
};

export default fetchQuizQuestions;
