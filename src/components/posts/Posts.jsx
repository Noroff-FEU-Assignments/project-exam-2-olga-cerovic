import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL, GET_ALL_POSTS } from "../../api";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = React.useState();

  async function handleDelete(postId) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${GET_ALL_POSTS}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPosts((posts) => posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPosts() {
    try {
      const response = await axios.get(`${BASE_URL}/${GET_ALL_POSTS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <button onClick={() => handleDelete(post.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
