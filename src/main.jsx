import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import QuizProvider from "./Providers/QuizProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <RouterProvider router={routes}></RouterProvider>
    </QuizProvider>
  </StrictMode>
);
