import React, { useState, useEffect, useCallback } from "react";
import styles from "./issues.module.css";
import { io } from "socket.io-client";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Issues({ filteredTasks, setTaskNumber, id, task }) {
  const [issues, setIssues] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const navigate = useNavigate();

  // ✅ Create socket once & reuse
  useEffect(() => {
    const socket = io(":8000");

    socket.on("new task added", (newTask) => {
      setIssues((prevIssues) => [...prevIssues, newTask]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ✅ Sync issues from props
  useEffect(() => {
    setIssues(filteredTasks || []);
  }, [filteredTasks]);

  // ✅ Highlight selected task if provided
  useEffect(() => {
    if (task) {
      setHighlighted(task.number);
    }
  }, [task]);

  const handleClick = useCallback(
    (issue) => {
      setHighlighted(issue.number);
      setTaskNumber(issue._id);
      navigate(`/home/geer/${issue._id}`);
    },
    [navigate, setTaskNumber]
  );

  // ✅ Sorting function
  const sort = useCallback((field) => {
    setIssues((prev) =>
      [...prev].sort((a, b) => String(a[field]).localeCompare(String(b[field])))
    );
  }, []);

  if (!issues.length) return <div>Loading...</div>;

  return (
    <div className={styles.panel}>
      {/* Sort Dropdown */}
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="light" className={styles.sortButton}>
          Sort by
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => sort("createdAt")}>
            Created
          </Dropdown.Item>
          <Dropdown.Item onClick={() => sort("priority")}>
            Priority
          </Dropdown.Item>
          <Dropdown.Item onClick={() => sort("status")}>Status</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Issue List */}
      <div className={styles.issueGroup}>
        {issues.map((issue) => (
          <div
            key={issue._id}
            className={`${styles.issue} ${
              issue.number === highlighted
                ? styles.selected
                : styles.notSelected
            }`}
            onClick={() => handleClick(issue)}
          >
            <span className={styles.issueName}>{issue.name}</span>
            <span className={styles.issueNumber}>
              <img
                className={styles.checkbox}
                src="https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png"
                alt="check"
              />
              GEER-{issue.number}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className={styles.bottom}>
        <span className={styles.bottomText}>
          {highlighted !== null
            ? `Issue ${highlighted} of ${issues.length}`
            : " "}
        </span>
      </div>
    </div>
  );
}
