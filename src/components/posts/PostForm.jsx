import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { BASE_URL, POSTS_PATH } from "../../api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";

import styles from "./Posts.module.css";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Please enter title"),
  body: yup.string(),
  tags: yup.array(yup.string().oneOf(["test", "cat", "dog"])),
  media: yup.string().nullable(),
});

// ************ ADD TAGS AND MEDIA FIELDS **********************
function PostForm(props) {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(props.post);
  }, [props.post]);

  async function handleCreatePost() {
    try {
      const response = await axios.post(
        `${BASE_URL}/${POSTS_PATH}`,
        getValues(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        navigate("/posts");
      }
    } catch (error) {}
  }

  async function handleEditPost() {
    try {
      const response = await axios.put(
        `${BASE_URL}/${POSTS_PATH}/${params.id}`,
        getValues(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status === 200) {
        navigate("/posts");
      }
    } catch (error) {}
  }

  const onSubmit = props.edit ? handleEditPost : handleCreatePost;

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>{props.edit ? "Edit" : "Create"}</h2>
        <Form.Control
          className={styles.input}
          placeholder="Type in title"
          {...register("title")}
        />
        {errors.title && <div>{errors.title.message}</div>}

        <Form.Control
          as="textarea"
          rows={3}
          className={styles.input}
          placeholder="Write some text"
          {...register("body")}
        />
        {errors.body && <div>{errors.body.message}</div>}

        <button type="submit" className={styles.btn}>
          {props.edit ? "Edit Post" : "Create Post"}
        </button>
      </Form>
    </div>
  );
}

export default PostForm;
