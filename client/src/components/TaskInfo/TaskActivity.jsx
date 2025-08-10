import React, { useState } from "react";
import styles from "./task.module.css";
import TaskComments from "./TaskComments";
import TaskHistory from "./TaskHistory";
import TaskWorkLog from "./TaskWorkLog";

export default function Activity({ task }) {
  const [display, setDisplay] = useState("comments");

  return (
    <div className={styles.taskActivity}>
      <h5>Activity</h5>
      <div>
        <span style={{ fontWeight: "bold" }}>Show:</span>
        <button
          onClick={() => setDisplay("comments")}
          className={
            display === "comments" ? styles.selectedButton : styles.taskButton
          }
        >
          Comments
        </button>
        <button
          onClick={() => setDisplay("history")}
          className={
            display === "history" ? styles.selectedButton : styles.taskButton
          }
        >
          History
        </button>
        <button
          onClick={() => setDisplay("work log")}
          className={
            display === "work log" ? styles.selectedButton : styles.taskButton
          }
        >
          Work Log
        </button>
      </div>
      <div className="row">
        <p></p>
      </div>
      {display === "comments" ? <TaskComments task={task} /> : <></>}
      {display === "history" ? <TaskHistory /> : <></>}
      {display === "work log" ? <TaskWorkLog /> : <></>}
    </div>
  );
}
