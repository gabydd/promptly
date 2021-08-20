import { useState } from "react";
import Calendar from "./CalendarView";
import AddTask from "./AddTask";
import ViewSelector from "./ViewSelector";
import { gql, useQuery } from "@apollo/client";
import TasksView from "./TasksView";
import { ConnectionsView } from "./ConnectionsView";

const GET_TASKS = gql`
  query GetTasks {
    getAssignedTasks {
      id
      name
      description
      date
      assignees {
        name
      }
      completed
      urgent
      manager {
        name
      }
    }
  }
`;

const AppView = ({ refetchUser, user }) => {
  const [date, setDate] = useState(new Date());

  const logOut = () => {
    document.cookie = "token=; expires=0";
    refetchUser();
  };
  const { loading, data, refetch } = useQuery(GET_TASKS);
  return (
    <div className="bg-gray-100">
      <button onClick={logOut}>Log Out</button>
      <ViewSelector date={date} setDate={setDate} />
      <Calendar testMonth="september" date={date} />
      <TasksView
        refetchTasks={refetch}
        tasks={data ? data.getAssignedTasks : undefined}
        loading={loading ? loading : undefined}
        user={user}
      />
      <div className="flex" >
      <AddTask refetchTasks={refetch} user={user} />
      <ConnectionsView refetchUser={refetchUser} user={user} />
      </div>
    </div>
  );
};

export default AppView;
