import { useMutation, gql } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Link from "next/link";
import { RefetchUserProps } from "../../lib/types";
import StyledButton from "../../components/StyledButton";
import FormFields from "../../components/FormFields";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
    }
  }
`;
const Login = ({ refetchUser }: RefetchUserProps) => {
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setMessage(data.login.message);
      refetchUser();
    },
  });
  const [message, setMessage] = useState("");

  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <div className="flex items-center justify-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              login({
                variables: { email: values.email, password: values.password },
              });
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <FormFields
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
            />
            <FormFields
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <StyledButton type="submit">Login</StyledButton>
          </Form>
        </Formik>
      </div>
      <div className="text-red-600 text-sm mt-2">{message}</div>
      <Link href="/auth/forgot">
        <button className="bg-blue-600 rounded-full w-full text-white">
          Forgot Password
        </button>
      </Link>
    </div>
  );
};

export default Login;
