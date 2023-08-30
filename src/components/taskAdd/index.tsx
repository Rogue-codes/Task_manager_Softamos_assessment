/* eslint-disable @typescript-eslint/ban-types */
import { TaskTypes } from "../../types";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../store/reducers/TaskSlice";

interface TaskAddProps {
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  setType:React.Dispatch<React.SetStateAction<string>>;
  taskInfo: TaskTypes;
  type: string;
  updatedTask: TaskTypes;
  setUpdatedTask: React.Dispatch<React.SetStateAction<TaskTypes>>;
}
export default function TaskAdd({
  setTaskName,
  taskInfo,
  type,
  updatedTask,
  setUpdatedTask,
  setType
}: TaskAddProps) {
  const dispatch = useDispatch();

  const add_Task = () => {
    type === "edit"
      ? dispatch(updateTask(updatedTask))
      : dispatch(addTask(taskInfo));
    setTaskName("");
    setUpdatedTask({ ...updatedTask, taskName: "" });
    setType("")
  };
  return (
    <div>
      <h2 className="text-lg lg:text-2xl font-bold">Task</h2>
      <div className="w-full mt-5 flex justify-start gap-3 items-center">
        <input
          className="w-[20rem] text-sm lg:text-md p-2 rounded-lg border border-[#8A8886] bg-white focus:outline-none"
          type="text"
          value={type === "edit" ? updatedTask?.taskName : taskInfo.taskName}
          onChange={
            type === "edit"
              ? (e) =>
                  setUpdatedTask({ ...updatedTask, taskName: e.target.value })
              : (e) => setTaskName(e.target.value)
          }
          placeholder="add a task"
        />
        <button
          className="px-5 py-2 bg-[#0078D4] cursor-pointer text-[#fff] rounded-lg hover:scale-110 transition-all disabled:cursor-not-allowed disabled:text-[#A19F9D]"
          onClick={add_Task}
          disabled={!taskInfo.taskName && !updatedTask.taskName}
        >
          {type === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
