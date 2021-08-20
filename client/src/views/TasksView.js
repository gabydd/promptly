import TaskView from "./TaskView"

const TasksView = ({tasks, loading, refetchTasks}) => {
    return (
        <div>
            {loading | tasks === null ? "Getting tasks..." : tasks.map((task) => {
                return <TaskView refetchTasks={refetchTasks} key={task.id} task={task} />
            })}
        </div>
    )
}

export default TasksView
