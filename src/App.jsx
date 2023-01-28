import React, { useState } from "react";
import { Box } from "@mui/material";
import NavBar from "./components/navbar/NavBar";
import Profile from "./components/profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import LoginForm from "./components/loginForm/LoginForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const protectedRoutes = createBrowserRouter([
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
  const otherRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <Box>
      {!isAuthenticated ? (
        <RouterProvider router={otherRoutes} />
      ) : (
        <NavBar setIsAuthenticated={setIsAuthenticated}>
          <RouterProvider router={protectedRoutes} />
        </NavBar>
      )}
    </Box>
  );
}

export default App;
