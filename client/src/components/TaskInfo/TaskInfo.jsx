import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskTitle from "./TaskTitle";
import TaskActivity from "./TaskActivity";
import TaskAssignee from "./TaskAssignee";
import TaskDesc from "./TaskDesc";
import TaskPriority from "./TaskPriority";
import TaskReporter from "./TaskReporter";
import TaskStatus from "./TaskStatus";

import styles from "./task.module.css";

export default function TaskInfo({ allUsers, taskNumber }) {
  const [loaded, setLoaded] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    setLoaded(false);
    axios
      .get(`http://localhost:8000/api/tasks/${taskNumber}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data);
        setLoaded(true);
      })
      .catch(console.log);
  }, [taskNumber]);

  if (!loaded) return "Loading...";

  if (taskNumber === undefined) console.log("tasknumber undefined");

  return (
    <div className={`row ${styles.taskInfo} `}>
      <div className="col-8">
        <p>GEER-{task.number}</p>
        <TaskTitle task={task} />
        <TaskDesc task={task} />
        <TaskActivity task={task} />
      </div>
      {taskNumber === undefined ? (
        <div className="col-4">
          <p>Select or create a task to get started!</p>
        </div>
      ) : (
        <div className="col-4">
          <TaskStatus currentTask={task} />
          <TaskAssignee allUsers={allUsers} currentTask={task} />
          <TaskReporter allUsers={allUsers} currentTask={task} />
          <TaskPriority currentTask={task} setTask={setTask} />
        </div>
      )}
    </div>
  );
}
