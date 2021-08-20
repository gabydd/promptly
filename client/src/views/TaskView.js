import { gql, useMutation } from "@apollo/client";
import { Formik, Form, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FormFields from '../components/FormFields'
import * as Yup from 'yup'

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      message
      success
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

const EDIT_TASK = gql`
  mutation EditTask(
    $id: Int!
    $assignees: [UserInput]
    $completed: Boolean
    $date: String
    $description: String
    $name: String
    $urgent: Boolean
  ) {
    editTask(
      id: $id
      assignees: $assignees
      completed: $completed
      date: $date
      description: $description
      name: $name
      urgent: $urgent
    ) {
      message
      success
    }
  }
`;
const TaskView = ({ task, refetchTasks, user }) => {
  const listid = "assignees";
  const [editing, setEditing] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => refetchTasks(),
  });

  const [editTask, {data}] = useMutation(EDIT_TASK, {
    onCompleted: () => refetchTasks(),
  });
  return (
    <div
      className={`rounded-lg shadow-2xl flex flex-col ${
        task.urgent ? "bg-red-400" : "bg-blue-400"
      }`}
    >
      <div className="flex flex-row">
        <div className="font-bold text-xl ml-auto">{task.name}</div>

        <div className="ml-auto mr-2 mt-1">
          <div className="group relative inline-block mt-1 mr-2">
            <button onClick={() => setEditing(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <span className="group-hover:inline-block absolute bg-gray-600 rounded shadow-lg z-50 left-1/2 top-full -ml-4 text-center text-white hidden">
              Edit
            </span>
          </div>
          <div className="group relative inline-block">
            <button
              onClick={() => deleteTask({ variables: { id: task.id } })}
              className="hover:bg-red-600 bg-green-600 rounded-full w-6 "
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <span className="group-hover:inline-block absolute bg-gray-600 rounded shadow-lg z-50 left-1/2 top-full -ml-8 text-center text-white hidden">
              Delete
            </span>
          </div>
        </div>
      </div>
      {editing ? (
        <div>
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
            editTask({
              variables: {
                name: values.name,
                description: values.description,
                date: new Date(values.date).toISOString(),
                urgent: values.urgent,
                assignees: values.assignees.filter((assignee) => assignee.email !== ""),
              },
            });
            setSubmitting(false);
          }, 400);
        }}
        className="flex items-center justify-center"
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
      {data ? data.addTask.message : null}
      <datalist id={listid}>
        {user.connections.map((connection) => {
          return (
            <option value={connection.email} key={connection.email}>
              {connection.name}
            </option>
          );
        })}
      </datalist>
        </div>
      ) : (
        <div>
          <div className="font-bold">Description</div>
          <div className="bg-yellow-300 rounded">{task.description}</div>
          <div>{new Date(Number(task.date)).toDateString()}</div>
          <div className="font-bold">
            Manager:{"  "}
            <div className="bg-green-800 rounded-md inline-block text-white ml-1">
              {task.manager.name}
            </div>
          </div>
          <div className="font-bold">
            Assigned to:{"  "}
            {task.assignees.map((assignee) => (
              <div
                key={assignee.name}
                className="bg-purple-600 rounded-md inline-block text-white ml-1"
              >
                {assignee.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskView;
