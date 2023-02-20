import { Form } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, POSTS_PATH } from "../../api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  body: yup.string().required("Please write a comment"),
});

function CommentForm() {
  const [unsuccessfulComment, setUnsuccessfulComment] = useState(null);
  const [successfulComment, setSuccessfulComment] = useState(null);

  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleComment(data) {
    setUnsuccessfulComment(null);
    setSuccessfulComment(null);
    try {
      const response = await axios.post(
        `${BASE_URL}/${POSTS_PATH}/${params.id}/comment`,
        {
          body: data.body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status > 199 && response.status < 300) {
        reset();
        setSuccessfulComment("Your comment is posted.");
      }
    } catch (error) {
      setUnsuccessfulComment("Type in comment.");
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(handleComment)}>
        <Form.Control placeholder="Write a comment..." {...register("body")} />
        {errors.body && <div>{errors.body.message}</div>}
        <button type="Submit">Comment</button>
      </Form>
      <div>{successfulComment}</div>
      <div>{unsuccessfulComment}</div>
    </div>
  );
}

export default CommentForm;
