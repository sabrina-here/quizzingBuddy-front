import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import QuizProvider from "./Providers/QuizProvider";
import AuthProvider from "./Providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizProvider>
          <RouterProvider router={routes}></RouterProvider>
        </QuizProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
