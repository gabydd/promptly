import { useState } from "react";
import Calendar from "./calendar/CalendarView";
import AddTask from "./task/AddTask";
import ViewSelector from "./ViewSelector";
import { gql, useQuery } from "@apollo/client";
import TasksView from "./task/TasksView";
import { ConnectionsView } from "./ConnectionsView";
import AddEvent from "./event/AddEvent";
import { CompleteUserProps, TaskTypeData } from "../types";

const GET_TASKS = gql`
  query GetTasks {
    getAssignedTasks {
      id
      name
      description
      date
      assignees {
        name
        email
      }
      completed
      urgent
      manager {
        name
      }
    }
  }
`;

const GET_EVENTS = gql`
  query GetEvents {
    getEventsAttending {
      id
      name
      description
      startTime
      endTime
      manager {
        name
      }
      attendees {
        name
        email
      }
    }
  }
`;

const AppView = ({ refetchUser, user }: CompleteUserProps) => {
  const [date, setDate] = useState(new Date());

  const logOut = () => {
    document.cookie = "token=; expires=0";
    refetchUser();
  };
  const {
    loading: tasksLoading,
    data: tasks,
    refetch: refetchTasks,
  } = useQuery<TaskTypeData>(GET_TASKS);
  const {
    loading: eventsLoading,
    data: events,
    refetch: refetchEvents,
  } = useQuery(GET_EVENTS);
  return (
    <div className="bg-gray-100">
      <button onClick={logOut}>Log Out</button>
      <ViewSelector date={date} setDate={setDate} />
      <Calendar date={date} />
      <TasksView
        refetchTasks={refetchTasks}
        tasks={tasks ? tasks.getAssignedTasks : undefined}
        loading={tasksLoading ? tasksLoading : undefined}
        user={user}
      />
      <div className="flex">
        <AddTask refetchTasks={refetchTasks} user={user} />
        <AddEvent refetchEvents={refetchEvents} user={user} />
        <ConnectionsView refetchUser={refetchUser} user={user} />
      </div>
    </div>
  );
};

export default AppView;
