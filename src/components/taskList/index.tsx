/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Tab from "../TabSelector";
import { Edit, Sort, TickSquare, Trash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { notask } from "../../assets";
import { TaskTypes } from "../../types";
import { deleteTask, toggleTask } from "../../store/reducers/TaskSlice";

interface TaskListProps {
  handleUpdate: (updateTaskInfo: TaskTypes) => void;
  searchQuery: string;
}
export default function TaskList({ handleUpdate, searchQuery }: TaskListProps) {
  const [showSortDrpDown, setShowSortDrpDown] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("");
  console.log(selectedSort);
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const toggleTaskStatus = (id: string) => {
    dispatch(toggleTask(id));
  };

  const task: TaskTypes[] = useSelector((state: any) => state.task.tasks);

  const filteredTask = task.filter((task: TaskTypes) => {
    if (activeTab === "All") {
      return task;
    } else if (activeTab === "Active") {
      return task.isCompleted === false;
    } else if (activeTab === "Completed") {
      return task.isCompleted === true;
    }
  });

  const filteredAndSortedTask = [...filteredTask]; // Create a copy of filteredTask to sort

  // Sorting function based on selected sorting option
  if (selectedSort === "Alphabetical") {
    filteredAndSortedTask.sort((a, b) => a.taskName.localeCompare(b.taskName));
  } else if (selectedSort === "Date") {
    filteredAndSortedTask.sort((a, b) => a.date.localeCompare(b.date));
  }
  // searchLogic
  const filteredSortedAndSearchedTask = filteredAndSortedTask.filter((task) => {
    const isMatchingTab =
      activeTab === "All" ||
      (activeTab === "Active" && !task.isCompleted) ||
      (activeTab === "Completed" && task.isCompleted);

    const isMatchingSearch = task.taskName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isMatchingTab && isMatchingSearch;
  });

  const sortArr: string[] = ["Alphabetical", "Date"];
  // console.log(task);
  return (
    <div className="mt-3">
      <div className="w-full flex !justify-between items-center">
        <Tab setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="w-[10rem] flex justify-end items-center p-3 mt-8 relative z-30">
          <button
            className="flex items-center gap-2 text-sm lg:text-md lg:gap-5"
            onClick={() => setShowSortDrpDown(!showSortDrpDown)}
          >
            <Sort size="20" color="#201F1E" />{" "}
            {selectedSort ? selectedSort : "Sort by"}
          </button>
          {showSortDrpDown && (
            <div className="absolute w-full left-0 top-10 lg:top-10 shadow-md p-2 border border-border bg-[#fff] !z-[999]">
              {sortArr.map((sortParams, index) => (
                <p
                  key={index}
                  className="p-2 text-sm lg:text-md border-b cursor-pointer hover:bg-[#0078D4] hover:text-white"
                  onClick={() => {
                    setSelectedSort(sortParams);
                    setShowSortDrpDown(false);
                  }}
                  onBlur={() => setShowSortDrpDown(false)}
                  tabIndex={0}
                >
                  {sortParams}
                </p>
              ))}
            </div>
          )}{" "}
        </div>
      </div>

      <div className="w-full p-6 border border-[#DDD]">
        {!filteredSortedAndSearchedTask.length ? (
          <div className="w-full flex justify-center items-center flex-col h-48">
            <div>
              <img src={notask} alt="" />
            </div>
            <p className="text-center mt-6 text-sm lg:text-md">No Tasks yet</p>
          </div>
        ) : (
          <div>
            {filteredSortedAndSearchedTask.map((task) => (
              <div
                className="flex justify-between items-center border-b border-border  my-3 pb-3"
                key={task.id}
              >
                {/* left */}
                <div className="flex justify-start gap-4 items-center">
                  <div
                    className={`${
                      task.isCompleted && "bg-green-500 border-none"
                    } cursor-pointer w-6 h-6 lg:w-8 lg:h-8 border border-black rounded-sm flex justify-center items-center`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.isCompleted && (
                      <TickSquare   variant="Bold" className="text-white text-sm lg:text-md" />
                    )}
                  </div>
                  <div>
                    <p className="truncate w-40 lg:w-80 text-sm lg:text-md">{task.taskName}</p>
                    <p className="text-xs lg:text-md">{task.date}</p>
                  </div>
                </div>

                {/* right */}
                <div className="flex justify-start gap-4 items-center">
                  <Edit
                    color="#605E5C"
                    className="cursor-pointer text-xs lg:text-md hover:scale-110 transition-all"
                    onClick={() => handleUpdate(task)}
                  />
                  <Trash
                    className="text-red-500 text-xs lg:text-md cursor-pointer hover:scale-110 transition-all"
                    onClick={() => handleDelete(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
