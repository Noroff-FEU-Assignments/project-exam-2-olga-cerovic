import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, LOGIN_PATH } from "../../api";
import axios from "axios";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthenticationContext } from "../../App";
import styles from "./LoginForm.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

function LoginForm() {
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const [unsuccessfulLoginMessage, setUnsuccessfulLoginMessage] =
    useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setUnsuccessfulLoginMessage(null);
    try {
      const response = await axios.post(`${BASE_URL}/${LOGIN_PATH}`, {
        email: data.email,
        password: data.password,
      });
      console.log(response);
      if (response?.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("avatar", response.data.avatar);
      }
    } catch (error) {
      setUnsuccessfulLoginMessage("Incorrect email or password.");
    }
  }

  return (
    <div className={styles.container}>
      <div>{unsuccessfulLoginMessage}</div>
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
      <hr />
      <div>
        <span>Forgot your login details?</span>
        <span>Get help signing in.</span>
      </div>
      <div className={styles.signUpLink}>
        <span>Don't have an account yet? Sign up here.</span>
      </div>
    </div>
  );
}

export default LoginForm;
