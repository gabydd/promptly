import TaskView from "./TaskView"

const TasksView = ({tasks, loading, refetchTasks, user}) => {
    return (
        <div>
            {loading | tasks === null ? "Getting tasks..." : tasks.map((task) => {
                return <TaskView refetchTasks={refetchTasks} user={user} key={task.id} task={task} />
            })}
        </div>
    )
}

export default TasksView
