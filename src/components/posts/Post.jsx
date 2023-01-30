import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, GET_ALL_POSTS } from "../../api";

function Post() {
  const [post, setPost] = React.useState();

  const params = useParams();

  async function getSinglePost() {
    try {
      const response = await axios.get(
        `${BASE_URL}/${GET_ALL_POSTS}/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSinglePost();
  }, [params.id]);
  return <div>{post?.title}</div>;
}

export default Post;
