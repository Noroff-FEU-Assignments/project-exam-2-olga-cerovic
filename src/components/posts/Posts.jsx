import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL, POSTS_PATH } from "../../api";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";

function Posts() {
  const [posts, setPosts] = React.useState();

  async function handleDelete(postId) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${POSTS_PATH}/${postId}`,
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

  async function handleLike(postId) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${POSTS_PATH}/${postId}/react/❤️`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPosts((previousState) =>
          previousState.map((post) => {
            if (post.id === postId) {
              return { ...post, likeCount: response.data.count };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPosts() {
    try {
      const response = await axios.get(`${BASE_URL}/${POSTS_PATH}`, {
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
      <Link to={`/posts/new`}>Create new post</Link>
      <ul className={styles.container}>
        {posts?.map((post) => (
          <li key={post.id} className={styles.linkContainer}>
            <Link to={`/posts/${post.id}`} className={styles.link}>
              {post.title}
              <br />
              {post.body}
            </Link>
            <br />
            <button onClick={() => handleDelete(post.id)}>DELETE</button>
            <button onClick={() => handleLike(post.id)}>
              Like {post.likeCount ? `(${post.likeCount})` : ""}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
