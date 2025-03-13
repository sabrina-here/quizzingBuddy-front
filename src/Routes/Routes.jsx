import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/SignUp/Signup";
import Quiz from "../Pages/Quiz/Quiz";
import Topics from "../Pages/Topics/Topics";
import PrivateRoute from "./PrivateRoute";
import MyQuizes from "../Pages/MyQuizes/MyQuizes";
import fetchQuizzesLoader from "./Loaders/fetchQuizzesLoader";
import MyTopics from "../Pages/Topics/MyTopics";
import UserProfile from "../Pages/UserProfile/UserProfile";

// const response = await axios.get(`/getQuizzes?topic=${topic}`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },

      {
        path: "/userProfile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/myQuizes",
        element: (
          <PrivateRoute>
            <MyQuizes />
          </PrivateRoute>
        ),
      },
      {
        path: "/myTopics",
        element: (
          <PrivateRoute>
            <MyTopics />
          </PrivateRoute>
        ),
      },
      {
        path: "/topics/:topic",
        element: (
          <PrivateRoute>
            <Topics />
          </PrivateRoute>
        ),
        loader: fetchQuizzesLoader,
      },
    ],
  },
]);

export default routes;
