import React, { useState } from "react";
import TaskHeader from "./TaskHeader";
import Issues from "./Issues";
import TaskInfo from "./TaskInfo/TaskInfo";
import styles from "./main.module.css";

export default function TaskParent({
  id,
  task,
  filteredTasks,
  setFilteredTasks,
  currentProject,
  allUsers,
}) {
  const [selectedTaskId, setSelectedTaskId] = useState(id);

  return (
    <div
      className={`${styles.taskParent} bg-white shadow-md rounded-xl overflow-hidden`}
    >
      {/* Header Section */}
      <TaskHeader
        currentProject={currentProject}
        setFilteredTasks={setFilteredTasks}
      />

      {/* Main Content */}
      <div
        className={`${styles.taskContent} flex flex-col md:flex-row gap-4 p-4`}
      >
        {/* Task List Section */}
        <Issues
          setTaskNumber={setSelectedTaskId}
          filteredTasks={filteredTasks}
          id={id}
          task={task}
        />

        {/* Task Details Section */}
        <TaskInfo allUsers={allUsers} taskNumber={selectedTaskId} />
      </div>
    </div>
  );
}
