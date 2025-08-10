import React, { useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskTitle({ task }) {
  const [name, setName] = useState(task.name);
  const [newName, setNewName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const changeName = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${task._id}`,
        { name: newName },
        { withCredentials: true }
      );
      setName(newName);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update the task name. Please try again.");
      console.error(err);
    }
  };

  const cancelChanges = () => {
    setNewName(name);
    setIsEditing(false);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      changeName();
    } else if (e.key === "Escape") {
      cancelChanges();
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {!isEditing ? (
        <h3
          tabIndex={0}
          role="button"
          onClick={() => setIsEditing(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsEditing(true);
          }}
          style={{
            cursor: "pointer",
            userSelect: "none",
            padding: "8px",
            borderBottom: "1px solid #ccc",
          }}
          aria-label={`Task title: ${name}. Click to edit`}
        >
          {name}
        </h3>
      ) : (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <label htmlFor="taskNameInput" className="visually-hidden">
            Edit task name
          </label>
          <input
            id="taskNameInput"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              flexGrow: 1,
              padding: "6px 8px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="button"
            onClick={changeName}
            className="btn btn-primary btn-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancelChanges}
            className="btn btn-danger btn-sm"
          >
            Cancel
          </button>
        </div>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "8px" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
