import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormFields from "../../../components/FormFields";
import { useMutation } from "@apollo/client";
import { CREATE_RESET_TOKEN } from "../../../lib/queries";
import { useRouter } from "next/router";
import { NextPage } from "next";
import StyledButton from "../../../components/StyledButton";

const Forgot: NextPage = (props) => {
  const [createResetToken, { data, loading }] = useMutation(CREATE_RESET_TOKEN);
  const { push } = useRouter();
  if (loading) {
    return <>Sending reset code...</>;
  } else if (data === undefined) {
  } else if (data.createResetToken.success) {
    push("/auth/forgot/reset");
    return <>Redirecting..</>;
  }
  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <div className="flex items-center justify-center">
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
        >
          <Form>
            <FormFields
              label="Email"
              name="email"
              type="text"
              autoComplete="username"
            />
            <div className="h-4" />
            <StyledButton type="submit">Forgot</StyledButton>
          </Form>
        </Formik>
      </div>
      {data && !data.createResetToken.success ? (
        <div>{data.createResetToken.message}</div>
      ) : undefined}
    </div>
  );
};

export default Forgot;
