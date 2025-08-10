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
  const [taskNum, setTaskNum] = useState(id);

  return (
    <div className={styles.taskParent}>
      <TaskHeader
        currentProject={currentProject}
        setFilteredTasks={setFilteredTasks}
      />
      <div className={styles.taskContent}>
        <Issues
          setTaskNumber={setTaskNum}
          filteredTasks={filteredTasks}
          id={id}
          task={task}
        />
        <TaskInfo allUsers={allUsers} taskNumber={taskNum} />
      </div>
    </div>
  );
}
