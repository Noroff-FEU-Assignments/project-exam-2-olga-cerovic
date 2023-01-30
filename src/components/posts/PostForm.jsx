import React from "react";
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";

import styles from "./Posts.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onSubmit(data) {
    try {
      const response = await axios.post(`${BASE_URL}/`, {
        email: data.email,
        password: data.password,
      });
      if (response?.status === 200) {
      }
    } catch (error) {}
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Form.Control
          className={styles.input}
          placeholder="Username or Email"
          {...register("email")}
        />
        {errors.email && <div>{errors.email.message}</div>}
        <Form.Control
          className={styles.input}
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <div>{errors.password.message}</div>}

        <button type="submit" className={styles.btn}>
          Login
        </button>
      </Form>
    </div>
  );
}

export default PostForm;
