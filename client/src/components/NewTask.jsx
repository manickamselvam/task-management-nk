import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Button, Form } from "react-bootstrap";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NewTask({ closeModal, projects, users }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2); // Default to Medium
  const [assignee, setAssignee] = useState("");
  const [projectID, setProjectID] = useState(projects?.[0]?._id || "");
  const [errors, setErrors] = useState([]);

  const creator = localStorage.getItem("userID");
  const status = "0";
  const socket = io(":8000", { autoConnect: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!name.trim()) {
      setErrors(["Task summary is required"]);
      return;
    }

    const newTask = {
      name,
      description,
      priority,
      assignee: assignee || null,
      creator,
      status,
      projectID,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/tasks/`, newTask, {
        withCredentials: true,
      });

      socket.connect();
      socket.emit("new task created", res.data.task);
      socket.disconnect();

      closeModal();
    } catch (err) {
      const errorResponse = err.response?.data?.errors || {};
      const errorArr = Object.values(errorResponse).map(
        (field) => field.properties?.message || field
      );
      setErrors(errorArr);
    }
  };

  if (!projects?.length) return <p>Loading projects...</p>;

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="text-red-500 text-sm mb-2">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      <Form.Group>
        <Form.Label>Project</Form.Label>
        <Form.Control
          as="select"
          value={projectID}
          onChange={(e) => setProjectID(e.target.value)}
        >
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Add more details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Assignee</Form.Label>
        <Form.Control
          as="select"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </Form.Control>
      </Form.Group>

      <div className="text-right">
        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </div>
    </Form>
  );
}
