import { Form, Formik } from "formik";
import FormFields from "../components/FormFields";
import * as Yup from 'yup'
import { gql, useMutation } from "@apollo/client";

const CONNECT = gql`
    mutation AddConnection($email: String!) {
        addConnection(email: $email) {
            message
            success
        }
    }
`

export const ConnectionsView = ({refetchUser, user}) => {
  const [addConnection, {data}] = useMutation(CONNECT, {onCompleted: () => refetchUser()})
  return (
    <div className="bg-origin-padding rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4" >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
              addConnection({variables: {email: values.email}})
            setSubmitting(false);
          }, 400);
        }}
        className="flex items-center justify-center"
      >
        <Form>
          <FormFields label="User's Email" name="email" type="email" />
          <button type="submit" className="rounded w-full bg-green-200 hover:bg-green-500">Connect</button>
          <div className="text-red-600 text-sm mt-2">{data ? data.addConnection.message : undefined}</div>
        </Form>
      </Formik>
      <div className="font-bold">Connections</div>
      {user.connections.map((connection) => {
          return <div key={connection.name} className="text-yellow-700">{connection.name}: {connection.email}</div>
      } )}
      <div className="font-bold">Connects To You</div>
      {user.connectsToUser.map((connection) => {
          return <div key={connection.name} className="text-yellow-700">{connection.name}: {connection.email}</div>
      } )}

    </div>
  );
};
