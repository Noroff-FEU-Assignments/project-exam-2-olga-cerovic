import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { BASE_URL, PROFILE_PATH } from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProfile } from "../../utils/index";

function Profile() {
  const [profile, setProfile] = React.useState();

  const params = useParams();

  async function handleFollow(follow) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${PROFILE_PATH}${params.name}/${
          follow ? "follow" : "unfollow"
        }`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        if (follow) {
          toast.success(`You are now following ${params.name}`);
        } else {
          toast.success(`You have now unfollowed ${params.name}`);
        }
      }
    } catch (error) {
      if (follow) {
        toast.error(`You are already following ${params.name}`);
      } else {
        toast.error(`You have already unfollowed ${params.name}`);
      }
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile(params);
      setProfile(data);
    };
    getProfile();
  }, [params]);

  return (
    <div>
      <p>{profile?.name}</p>
      <p>{profile?.email}</p>
      <Avatar sx={{ width: 150, height: 150 }} src={profile?.avatar}>
        {profile?.name[0]}
      </Avatar>
      <button onClick={() => handleFollow(true)}>Follow</button>
      <button onClick={() => handleFollow(false)}>Unfollow</button>
    </div>
  );
}

export default Profile;
