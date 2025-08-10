import React, { useState } from "react";
import axios from "axios";

export default function TaskTitle({ task }) {
  const [name, setName] = useState(task.name);
  const [newName, setNewName] = useState(task.name);
  const [selected, setSelected] = useState(false);

  const changeName = () => {
    axios
      .put(
        `http://localhost:8000/api/tasks/${task._id}`,
        { name: newName },
        { withCredentials: true }
      )
      .then((res) => {
        setName(newName);
        setSelected(false);
      })
      .catch(console.log);
  };

  const cancelChanges = () => {
    setNewName(name);
    setSelected(false);
  };

  return (
    <div>
      <h1 onClick={() => setSelected(!selected)}>{name}</h1>
      <div
        style={selected ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="button"
          onClick={changeName}
          className="btn btn-primary btn-sm"
        >
          Change Name
        </button>
        <button
          type="button"
          onClick={cancelChanges}
          className="btn btn-danger btn-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
