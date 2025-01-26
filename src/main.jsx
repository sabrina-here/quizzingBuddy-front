import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import QuizProvider from "./Providers/QuizProvider";
import AuthProvider from "./Providers/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QuizProvider>
        <RouterProvider router={routes}></RouterProvider>
      </QuizProvider>
    </AuthProvider>
  </StrictMode>
);
