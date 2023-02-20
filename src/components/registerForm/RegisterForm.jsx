import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, REGISTER_PATH } from "../../api";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address")
    .test("contains", "Must contain stud.noroff.no", (val) =>
      val.includes("stud.noroff.no")
    ),
  password: yup
    .string()
    .min(8, "Password must contain minimum 8 characters.")
    .required("Please enter your password"),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await axios.post(`${BASE_URL}/${REGISTER_PATH}`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response?.status === 201) {
        toast.success("You are now a registered user");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errors?.[0]?.message);
    }
  }

  return (
    <>
      <Form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>

        <label>Name</label>
        <Form.Control {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}

        <label>Email</label>
        <Form.Control {...register("email")} />
        {errors.email && <div>{errors.email.message}</div>}

        <label>Password</label>
        <Form.Control type="password" {...register("password")} />
        {errors.password && <div>{errors.password.message}</div>}

        <button type="submit">Register</button>
      </Form>
      <Link to={"/"}>Go to Login Page</Link>
    </>
  );
}

export default RegisterForm;
