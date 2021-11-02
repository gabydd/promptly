import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import AddTask from "./tasks/AddTask";
import DateSelector from "../components/calendar/DateSelector";
import { useQuery } from "@apollo/client";
import TasksView from "./tasks/TasksView";
import { ConnectionsView } from "./ConnectionsView";
import AddEvent from "./events/AddEvent";
import { CompleteUserProps, TaskTypeData } from "../lib/types";
import { GET_TASKS, GET_EVENTS } from "../lib/queries";



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
      <DateSelector date={date} setDate={setDate} />
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
