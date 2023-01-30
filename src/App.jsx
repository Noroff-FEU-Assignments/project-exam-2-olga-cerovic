import React, { createContext, useState } from "react";
import { Box } from "@mui/material";
import NavBar from "./components/navbar/NavBar";
import { Outlet, RouterProvider } from "react-router-dom";
import styles from "./components/loginForm/LoginForm.module.css";

import { otherRoutes, protectedRoutes } from "./routes";

export const AuthenticationContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );
  console.log(isAuthenticated);

  return (
    <Box>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        {!isAuthenticated ? (
          <Box className={styles.loginContainer}>
            <RouterProvider router={otherRoutes} />
          </Box>
        ) : (
          <RouterProvider router={protectedRoutes}></RouterProvider>
        )}
      </AuthenticationContext.Provider>
    </Box>
  );
}

export default App;
