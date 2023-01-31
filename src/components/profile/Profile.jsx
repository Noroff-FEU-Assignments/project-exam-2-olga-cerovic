import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, PROFILE_PATH } from "../../api";
import ImageUpload from "../imageUpload/ImageUpload";
import axios from "axios";

function Profile() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    handleUploadImage();
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function handleUploadImage() {
    try {
      const response = await axios.put(
        `${BASE_URL}/${PROFILE_PATH}${localStorage.getItem("name")}/media`,
        {
          avatar:
            "https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/288523620_10225542036650537_6057528886008546066_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=vX8fK089huMAX-vPB6R&_nc_ht=scontent.fosl3-2.fna&oh=00_AfCPX9EXvP_INbRKWAFpHxoSHc28EFjxLliKlHNuqDdHzg&oe=63DBC38A",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        // localStorage.setItem("avatar", response.data.avatar);
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

export default Profile;
