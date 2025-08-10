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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskInfo({ allUsers, taskNumber }) {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskNumber === undefined || taskNumber === null) {
      setTask(null);
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}/tasks/${taskNumber}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load task.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [taskNumber]);

  if (taskNumber === undefined || taskNumber === null) {
    return (
      <div className={`container py-4 text-center ${styles.taskInfo}`}>
        <p className="fs-5 text-muted">
          Select or create a task to get started!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`container py-4 text-center ${styles.taskInfo}`}>
        <p className="fs-5 text-muted">Loading task details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`container py-4 text-center ${styles.taskInfo} text-danger`}
      >
        <p className="fs-5">{error}</p>
      </div>
    );
  }

  return (
    <div className={`row ${styles.taskInfo} gap-3`}>
      <div className="col-12 col-md-8">
        <h5 className="mb-3">GEER-{task?.number ?? "N/A"}</h5>
        <TaskTitle task={task} />
        <TaskDesc task={task} />
        <TaskActivity task={task} />
      </div>
      <div className="col-12 col-md-3">
        <TaskStatus currentTask={task} />
        <TaskAssignee allUsers={allUsers} currentTask={task} />
        <TaskReporter allUsers={allUsers} currentTask={task} />
        <TaskPriority currentTask={task} setTask={setTask} />
      </div>
    </div>
  );
}
