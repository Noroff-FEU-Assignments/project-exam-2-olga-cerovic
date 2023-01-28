import React, { createContext, useState } from "react";
import { Box } from "@mui/material";
import NavBar from "./components/navbar/NavBar";
import { RouterProvider } from "react-router-dom";

import { otherRoutes, protectedRoutes } from "./routes";

export const AuthenticationContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Box>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        {!isAuthenticated ? (
          <RouterProvider router={otherRoutes} />
        ) : (
          <NavBar>
            <RouterProvider router={protectedRoutes} />
          </NavBar>
        )}
      </AuthenticationContext.Provider>
    </Box>
  );
}

export default App;
