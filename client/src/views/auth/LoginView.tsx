import { useMutation, gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { RefetchUserProps } from "../../types";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
    }
  }
`;
const LoginView = ({ refetchUser }: RefetchUserProps) => {
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setMessage(data.login.message);
      refetchUser();
    },
  });
  const [message, setMessage] = useState("");

  const [forgot, setForgot] = useState(false);

  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      {forgot ? <Redirect to="/auth/forgot" /> : undefined}
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
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <Field name="email" type="email" className="rounded-lg " />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm"
            />
            <div className="h-4" />
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <Field name="password" type="password" className="rounded-lg " />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-sm"
            />
            <div className="h-4" />
            <button
              type="submit"
              className="bg-blue-600 rounded-full w-full text-white"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
      <div className="text-red-600 text-sm mt-2">{message}</div>
      <button
        onClick={() => setForgot(true)}
        className="bg-blue-600 rounded-full w-full text-white mt-5"
      >
        Forgot Password
      </button>
    </div>
  );
};

export default LoginView;
