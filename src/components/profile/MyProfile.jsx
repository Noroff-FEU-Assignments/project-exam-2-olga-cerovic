import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, PROFILE_PATH } from "../../api";
import ImageUpload from "../imageUpload/ImageUpload";
import axios from "axios";

function MyProfile() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    handleUploadImage();
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function handleUploadImage() {
    try {
      const response = await axios.put(
        `${BASE_URL}/${PROFILE_PATH}${localStorage.getItem("name")}/media`,
        {
          avatar:
            "https://media.npr.org/assets/img/2022/11/23/russian-toy-2-002--059b8a825dac13f92234d65777e6b29b0914e92f-s1100-c50.jpg",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      <Avatar
        sx={{ width: 150, height: 150 }}
        src={localStorage.getItem("avatar")}
      />
      <ImageUpload setSelectedFile={setSelectedFile} />
    </Box>
  );
}

export default MyProfile;
