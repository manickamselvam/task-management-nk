import React, { useState } from "react";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskEstimate({ estimate: initialEstimate, number }) {
  const [estimate, setEstimate] = useState(initialEstimate || "");

  const handleChange = async (value) => {
    setEstimate(value);

    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${number}`,
        { estimate: value },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to update estimate:", error);
    }
  };

  return (
    <Form className="mt-2">
      <Form.Label className="fw-bold">Task Estimate (hours)</Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          min="0"
          value={estimate}
          placeholder="Enter hours"
          onChange={(e) => handleChange(e.target.value)}
        />
        <InputGroup.Text>hrs</InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
