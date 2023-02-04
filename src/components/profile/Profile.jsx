import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, PROFILE_PATH } from "../../api";
import ImageUpload from "../imageUpload/ImageUpload";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  console.log("nesto");
  const [profile, setProfile] = React.useState();

  const params = useParams();

  async function getProfile() {
    try {
      const response = await axios.get(
        `${BASE_URL}/${PROFILE_PATH}${params.name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, [params.name]);

  return (
    <div>
      <p>{profile?.name}</p>
      <p>{profile?.email}</p>
      <Avatar sx={{ width: 150, height: 150 }} src={profile?.avatar}>
        {profile?.name[0]}
      </Avatar>
    </div>
  );
}

export default Profile;
