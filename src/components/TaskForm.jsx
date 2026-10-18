import React, { useContext, useId, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const inputId = useId();

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    addTask(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task</label>

      <input
        id={inputId}
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;