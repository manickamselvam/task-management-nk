import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import styles from "./task.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskPriority({ currentTask, setTask }) {
  const [priority, setPriority] = useState(currentTask.priority);
  const [loading, setLoading] = useState(false);

  const handleChange = async (value) => {
    setLoading(true);
    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${currentTask._id}`,
        { priority: value },
        { withCredentials: true }
      );
      setPriority(value);
      // Optionally update parent task state if needed
      setTask((prev) => ({ ...prev, priority: value }));
    } catch (error) {
      console.error(error);
      alert("Failed to update priority. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.dropdown}
      style={{ maxWidth: 200, margin: "1rem 0" }}
    >
      <h5 style={{ marginBottom: "0.5rem" }}>Priority</h5>
      <Form.Select
        aria-label="Select task priority"
        value={priority}
        onChange={(e) => handleChange(Number(e.target.value))}
        disabled={loading}
        className={styles.select}
      >
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </Form.Select>
    </div>
  );
}
