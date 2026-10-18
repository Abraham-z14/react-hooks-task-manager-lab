import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query = "" }) {
  const { tasks, toggleComplete } = useContext(TaskContext);

const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(query.toLowerCase())
);

  return (
    <div>
      {filteredTasks.map((task) => (
        <div key={task.id}>
          <span>{task.title}</span>

          <button
            data-testid={task.id}
            onClick={() => toggleComplete(task)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;