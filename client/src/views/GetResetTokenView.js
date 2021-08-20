import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormFields from "../components/FormFields";
import { useMutation, gql } from "@apollo/client";
import { Redirect } from "react-router-dom";

const CREATE_RESET_TOKEN = gql`
  mutation CreateResetToken($email: String!) {
    createResetToken(email: $email) {
      message
      success
    }
  }
`;

const GetResetTokenView = () => {
  const [createResetToken, { data, loading }] = useMutation(CREATE_RESET_TOKEN);

  if (loading) {
    return <div>Sending reset code...</div>;
  } else if (data === undefined) {
  } else if (data.createResetToken.success) {
    return <Redirect to="/auth/forgot/reset" />;
  }
  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            createResetToken({
              variables: { email: values.email },
            });

            setSubmitting(false);
          }, 400);
        }}
        className="flex items-center justify-center"
      >
        <Form>
          <FormFields label="Email" name="email" type="text" />
          <div className="h-4" />
          <button
            type="submit"
            className="bg-blue-600 rounded-full w-full text-white"
          >
            Forgot
          </button>
        </Form>
      </Formik>
      {data && !data.createResetToken.success ? (
        <div>{data.createResetToken.message}</div>
      ) : undefined}
    </div>
  );
};

export default GetResetTokenView;
