import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, LOGIN_PATH } from "../../api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

function LoginForm() {
  const [unsuccessfulLoginMessage, setUnsuccessfulLoginMessage] =
    useState(null);
  const navigate = useNavigate();
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
        identifier: data.email,
        password: data.password,
      });
      if (response?.status === 200) {
        console.log("login successful");
        navigate("/admin");
      }
    } catch (error) {
      setUnsuccessfulLoginMessage("Incorrect email or password.");
    }
  }

  return (
    <>
      <div className="unsuccessful-msg">{unsuccessfulLoginMessage}</div>
      <Form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <label>Email</label>
        <Form.Control {...register("email")} />
        {errors.email && <div>{errors.email.message}</div>}
        <label>Password</label>
        <Form.Control type="password" {...register("password")} />
        {errors.password && <div>{errors.password.message}</div>}

        <button>Send</button>
      </Form>
    </>
  );
}

export default LoginForm;
