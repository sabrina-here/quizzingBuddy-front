import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://quizzing-buddy-back.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
