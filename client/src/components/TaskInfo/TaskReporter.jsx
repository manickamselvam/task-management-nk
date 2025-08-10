import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import styles from "./task.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskReporter({ currentTask, allUsers }) {
  const [reporter, setReporter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize reporter when currentTask loads
  useEffect(() => {
    setReporter(currentTask?.creator ?? "Unassigned");
    setLoading(false);
  }, [currentTask]);

  const handleChange = async (value) => {
    setReporter(value);
    setError(null);
    const creator = value === "Unassigned" ? null : value;

    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${currentTask._id}`,
        { creator },
        { withCredentials: true }
      );
      // Optionally show success toast or update state elsewhere
    } catch (err) {
      setError("Failed to update reporter");
      console.error(err);
      // Optionally rollback reporter state here or show detailed message
    }
  };

  if (loading) return <div>Loading reporter...</div>;

  return (
    <div className={styles.dropdown} style={{ maxWidth: 300 }}>
      <h5>Reporter</h5>
      <Form.Select
        value={reporter}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Select task reporter"
      >
        <option value="Unassigned">Unassigned</option>
        {allUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </Form.Select>
      {error && <p style={{ color: "red", marginTop: 5 }}>{error}</p>}
    </div>
  );
}
