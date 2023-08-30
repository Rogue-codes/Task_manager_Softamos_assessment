/* eslint-disable @typescript-eslint/ban-types */
import Nav from "../components/header";
import TaskList from "../components/taskList";
import TaskAdd from "../components/taskAdd";
import { useState } from "react";
import { formatDate } from "../utils/date";
import { v4 as uuidv4 } from "uuid";
import { TaskTypes } from "../types";
// import { useDispatch } from "react-redux";
// import { updateTask } from "../store/reducers/TaskSlice";

export default function Home() {
  const [taskName, setTaskName] = useState<string>("");
  const taskInfo: TaskTypes = {
    id: uuidv4(),
    taskName: taskName,
    date: formatDate(new Date()),
    isCompleted: false,
  };

  const [updatedTask, setUpdatedTask] = useState<TaskTypes>({
    taskName:"",
    id:"",
    date:"",
    isCompleted: false,
  });
  const [type, setType] = useState<string>("");

  // const dispatch = useDispatch()
  const handleUpdate = (updateTaskInfo: TaskTypes) => {
    setUpdatedTask({ ...taskInfo, ...updateTaskInfo });
    setType("edit");
  };

  const [searchQuery,setSearchQuery] = useState('')
  return (
    <div>
      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="p-4 lg:p-24">
        <TaskAdd
          setTaskName={setTaskName}
          taskInfo={taskInfo}
          type={type}
          updatedTask={updatedTask}
          setUpdatedTask={setUpdatedTask}
        />
        <TaskList searchQuery={searchQuery} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
}
