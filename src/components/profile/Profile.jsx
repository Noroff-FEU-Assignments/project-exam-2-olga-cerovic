import { Avatar, Box } from "@mui/material";
import React from "react";

function Profile() {
  return (
    <Box
      sx={{
        backgroundColor: "violet",
        height: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {" "}
      <Avatar sx={{ width: 150, height: 150 }} src="./images/macka.jpg" />
    </Box>
  );
}

export default Profile;
