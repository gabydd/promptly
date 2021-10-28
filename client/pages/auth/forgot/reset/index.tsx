import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormFields from "../../../../components/FormFields";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { NextPage } from "next";
import { RESET_PASSWORD } from "../../../../lib/queries";
import StyledButton from "../../../../components/StyledButton";

const ResetPasswordView: NextPage = (props) => {
  const [resetPassword, { data, loading }] = useMutation(RESET_PASSWORD);
  if (loading) {
    return <div>Checking</div>;
  } else if (data === undefined) {
  } else if (data.resetPassword.success) {
    return (
      <div className="flex items-center justify-center flex-col bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
        <div className="text-center">Reset Successful</div>
        <Link href="/auth">
          <button className="bg-blue-600 rounded-full w-full text-white mt-5 text-center">
            Sign In
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <div className="flex items-center justify-center">
        <Formik
          initialValues={{ email: "", password: "", token: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
            token: Yup.string()
              .matches(/^\d+$/, "Reset code is only numbers")
              .length(6, "Reset code is six digits")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              resetPassword({
                variables: {
                  email: values.email,
                  password: values.password,
                  token: values.token,
                },
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
              autoComplete="new-password"
            />
            <FormFields
              label="Reset Code"
              name="token"
              type="text"
              autoComplete="one-time-code"
            />
            <div className="h-4" />
            <StyledButton type="submit">Reset</StyledButton>
          </Form>
        </Formik>
      </div>
      {data && !data.resetPassword.success ? (
        <div>{data.resetPassword.message}</div>
      ) : undefined}
    </div>
  );
};

export default ResetPasswordView;
