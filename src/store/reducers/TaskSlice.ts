/* eslint-disable @typescript-eslint/ban-types */
import { createSlice } from "@reduxjs/toolkit";
import { TaskTypes } from "../../types";
import { toast } from "react-toastify";

interface InitialStateProps {
  tasks: TaskTypes[];
}

const initialState: InitialStateProps = {
  tasks: localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task")!)
    : [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTasks = [...state.tasks, action.payload];
      state.tasks = newTasks;
      localStorage.setItem("task", JSON.stringify(newTasks));
      toast.success("Task Added...");
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const taskToUpdate = state.tasks.find(
        (task) => task.id === updatedTask.id
      );
      if (taskToUpdate) {
        const updatedTasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        state.tasks = updatedTasks;
        localStorage.setItem("task", JSON.stringify(updatedTasks));
        toast.success("Task Updated...");
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== id);

      // Update state and local storage only if a task was actually deleted
      if (updatedTasks.length < state.tasks.length) {
        state.tasks = updatedTasks;
        localStorage.setItem("task", JSON.stringify(updatedTasks));
        toast.error("Task Deleted...");
      }
    },
    toggleTask: (state, action) => {
      const id = action.payload;

      // Find the task by its ID in the state.tasks array
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          // Toggle the isCompleted property of the task
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });

      // Update state and local storage with the updated tasks
      state.tasks = updatedTasks;
      localStorage.setItem("task", JSON.stringify(updatedTasks));
      toast.success("Task status updated...");
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTask } =
  taskSlice.actions;

// export default taskSlice.reducer
