import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  function addTask(title) {
    const newTask = {
      title,
      completed: false,
    };

    return fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((createdTask) => {
        setTasks((currentTasks) => [...currentTasks, createdTask]);
      });
  }

  function toggleComplete(task) {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    return fetch(`http://localhost:6001/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: updatedTask.completed,
      }),
    })
      .then((response) => response.json())
      .then((savedTask) => {
        setTasks((currentTasks) =>
          currentTasks.map((currentTask) =>
            currentTask.id === savedTask.id ? savedTask : currentTask
          )
        );
      });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}