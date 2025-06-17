import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignupPage from "./pages/signupPage/SignupPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Dashboard from "./pages/dashboard/Dashboard";
import CardsPage from "./pages/CardsPage/CardsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "signup", element: <SignupPage /> },
      { path: "/cards", element: <CardsPage /> },
    ],
  },
]);

export default router;
