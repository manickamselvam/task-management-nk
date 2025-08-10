import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import styles from "./task.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskStatus({ currentTask }) {
  const [status, setStatus] = useState(currentTask.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = async (value) => {
    setStatus(value);
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${currentTask._id}`,
        { status: value },
        { withCredentials: true }
      );
    } catch (err) {
      setError("Failed to update status");
      setStatus(currentTask.status); // rollback on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.dropdown}
      style={{ maxWidth: 200, margin: "1rem 0" }}
    >
      <Form.Label htmlFor="task-status-select" className="mb-2 fw-semibold">
        Status
      </Form.Label>
      <Form.Select
        id="task-status-select"
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
        aria-describedby="statusHelp"
      >
        <option value="0">To Do</option>
        <option value="1">Done</option>
      </Form.Select>
      {loading && (
        <small id="statusHelp" className="text-muted">
          Updating...
        </small>
      )}
      {error && <small className="text-danger mt-1 d-block">{error}</small>}
    </div>
  );
}
