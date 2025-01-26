import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";

import Signup from "../Pages/SignUp/Signup";
import Quiz from "../Pages/Quiz/Quiz";
import Login from "../Pages/SignUp/Login";

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
    ],
  },
]);

export default routes;
