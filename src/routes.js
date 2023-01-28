import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/loginForm/LoginForm";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Profile from "./components/profile/Profile";

export const protectedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <div>Ovo je test</div>,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export const otherRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
