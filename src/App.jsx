import React, { createContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import styles from "./components/loginForm/LoginForm.module.css";

import { otherRoutes, protectedRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProfile } from "./utils";

export const AuthenticationContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile({ name: localStorage.getItem("name") });
      localStorage.setItem("avatar", data.avatar);
    };
    getProfile();
  }, []);

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
        <ToastContainer />
      </AuthenticationContext.Provider>
    </Box>
  );
}

export default App;
