import React, { useState } from "react";
import axios from "axios";
import { FormControl } from "react-bootstrap";
import styles from "./task.module.css";

export default function TaskStatus({ currentTask }) {
  const [status, setStatus] = useState(currentTask.status);

  const handleChange = (value) => {
    setStatus(value);

    axios
      .put(
        `http://localhost:8000/api/tasks/${currentTask._id}`,
        { status: value },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch(console.log);
  };

  return (
    <div className={styles.dropdown}>
      <h5>Status</h5>
      <FormControl
        as="select"
        value={status}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="0">To Do</option>
        <option value="1">Done</option>
      </FormControl>
    </div>
  );
}
