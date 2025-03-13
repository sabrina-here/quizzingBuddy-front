import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL:
    "https://quizzing-buddy-back-sabrina-here-sabrinaheres-projects.vercel.app",
  // baseURL: "https://quizzing-buddy-back.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
