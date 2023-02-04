import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL, PROFILE_PATH } from "../../api";
import { Link } from "react-router-dom";
import styles from "./Profiles.module.css";

function Profiles() {
  const [profiles, setProfiles] = React.useState();

  //   async function handleDelete(profileId) {
  //     try {
  //       const response = await axios.delete(
  //         `${BASE_URL}/${PROFILE_PATH}/${profileId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         setProfiles((profiles) =>
  //           profiles.filter((profile) => profile.id !== profileId)
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function getAllProfiles() {
    try {
      const response = await axios.get(`${BASE_URL}/${PROFILE_PATH}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <div>
      <ul className={styles.listContainer}>
        {profiles?.map((profile) => (
          <li key={profile.name} className={styles.linkContainer}>
            <Link to={`/profiles/${profile.name}`} className={styles.link}>
              {profile.name}
            </Link>
            {/* <button onClick={() => handleDelete(profile.id)}>DELETE</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profiles;
