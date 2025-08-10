import React, { useState } from "react";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import { CalendarEvent } from "react-bootstrap-icons"; // Bootstrap icon
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskDueDate({ currentTask }) {
  const [dueDate, setDueDate] = useState(currentTask?.dueDate || "");

  const handleChange = async (value) => {
    setDueDate(value);
    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${currentTask._id}`,
        { dueDate: value },
        { withCredentials: true }
      );
      console.log("Due date updated successfully");
    } catch (error) {
      console.error("Error updating due date:", error);
    }
  };

  return (
    <div className="mt-3">
      <Form.Group>
        <Form.Label className="fw-semibold">📅 Due Date</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <CalendarEvent />
          </InputGroup.Text>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => handleChange(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
    </div>
  );
}
