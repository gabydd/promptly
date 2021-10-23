import { Formik, Form, FieldArray } from "formik";
import FormFields from "../../components/FormFields";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { AddTaskProps } from "../../types";

const CREATE_TASK = gql`
  mutation CreateTask(
    $name: String!
    $description: String!
    $date: String!
    $urgent: Boolean!
    $assignees: [UserInput]!
  ) {
    addTask(
      name: $name
      description: $description
      date: $date
      urgent: $urgent
      assignees: $assignees
    ) {
      success
      message
    }
  }
`;

const initialValues = {
  name: "",
  description: "",
  date: "",
  urgent: false,
  assignees: [{ email: "" }],
};
const AddTask = ({ refetchTasks, user }: AddTaskProps) => {
  const [createTask, { data }] = useMutation(CREATE_TASK, {
    onCompleted: () => refetchTasks(),
  });
  const listid = "assignees";
  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <div className="flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            date: Yup.date(),
            urgent: Yup.bool(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              createTask({
                variables: {
                  name: values.name,
                  description: values.description,
                  date: new Date(values.date).toISOString(),
                  urgent: values.urgent,
                  assignees: values.assignees.filter(
                    (assignee) => assignee.email !== ""
                  ),
                },
              });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values }) => (
            <Form>
              <FormFields label="Title" name="name" type="text" />
              <FormFields
                label="Description"
                name="description"
                type="textarea"
              />
              <FormFields label="Date" name="date" type="datetime-local" />
              <FormFields label="Urgent" name="urgent" type="checkbox" />
              <FieldArray name="assignees">
                {({ remove, push }) => (
                  <div className="flex items-center flex-col">
                    {values.assignees.length > 0 &&
                      values.assignees.map((assignee, index) => (
                        <div key={index} className="flex items-center">
                          <FormFields
                            name={`assignees.${index}.email`}
                            list={listid}
                            label="Assignee"
                          />
                          <button
                            onClick={() => remove(index)}
                            className="mt-2 ml-1 rounded-lg w-6 bg-red-200 hover:bg-red-500"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push({ email: "" })}
                      className="rounded bg-yellow-200 hover:bg-yellow-500 mb-3 -mt-3"
                    >
                      New Assignee
                    </button>
                  </div>
                )}
              </FieldArray>

              <button
                type="submit"
                className="rounded w-full bg-green-200 hover:bg-green-500"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {data ? data.addTask.message : null}
      <datalist id={listid}>
        {user.connections!.map((connection) => {
          return (
            <option value={connection.email} key={connection.email}>
              {connection.name}
            </option>
          );
        })}
      </datalist>
    </div>
  );
};

export default AddTask;
