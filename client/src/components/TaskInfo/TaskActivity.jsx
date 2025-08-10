import React, { useState } from "react";
import styles from "./task.module.css";
import TaskComments from "./TaskComments";
import TaskHistory from "./TaskHistory";
import TaskWorkLog from "./TaskWorkLog";

export default function Activity({ task }) {
  const [display, setDisplay] = useState("comments");

  const tabs = [
    {
      key: "comments",
      label: "Comments",
      component: <TaskComments task={task} />,
    },
    { key: "history", label: "History", component: <TaskHistory /> },
    { key: "work log", label: "Work Log", component: <TaskWorkLog /> },
  ];

  const activeTab = tabs.find((tab) => tab.key === display);

  return (
    <div className={styles.taskActivity}>
      <h5>Activity</h5>
      <div className={styles.tabHeader}>
        <span className={styles.tabLabel}>Show:</span>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setDisplay(tab.key)}
            className={
              display === tab.key ? styles.selectedButton : styles.taskButton
            }
            aria-pressed={display === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>{activeTab?.component}</div>
    </div>
  );
}
