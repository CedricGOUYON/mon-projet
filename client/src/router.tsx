import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignupPage from "./pages/signupPage/SignupPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Dashboard from "./pages/dashboard/Dashboard";
import CardsPage from "./pages/CardsPage/CardsPage";
import RickAndMortyPage from "./pages/rickAndMorty/RickAndMortyPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "signup", element: <SignupPage /> },
        { path: "cards", element: <CardsPage /> },
        { path: "rick", element: <RickAndMortyPage /> },
      ],
    },
  ],
  {
    basename: "/", // adapte selon ton déploiement, ou supprime si pas besoin
  }
);

export default router;
