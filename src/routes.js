import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/loginForm/LoginForm";
import NavBar from "./components/navbar/NavBar";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Profile from "./components/profile/Profile";
import RegisterForm from "./components/registerForm/RegisterForm";

export const protectedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <div>Ovo je test</div>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
export const otherRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
