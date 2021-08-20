import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      message
      success
    }
  }
`;

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
const TaskView = ({ task, refetchTasks }) => {
  const [editing, setEditing] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => refetchTasks(),
  });

  const [editTask] = useMutation(EDIT_TASK, {
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
        <div></div>
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
