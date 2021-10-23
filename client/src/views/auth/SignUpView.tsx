import { useMutation, gql, ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    createAccount(email: $email, password: $password, name: $name) {
      message
    }
  }
`;

type SignUpProps = {
  refetchUser: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

const SignUpView = ({ refetchUser }: SignUpProps) => {
  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      setMessage(data.createAccount.message);
      refetchUser();
    },
  });
  const [message, setMessage] = useState("");
  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <div className="flex items-center justify-center">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              signUp({
                variables: {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                },
              });
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <Field name="name" type="name" className="rounded-lg " />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 text-sm"
            />
            <div className="h-4" />
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
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
      <div className="text-red-600 text-sm mt-2">{message}</div>
    </div>
  );
};

export default SignUpView;
