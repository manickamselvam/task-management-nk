import React, { useState } from "react";
import axios from "axios";
import { FormControl } from "react-bootstrap";

export default function TaskEstimate(currentTask) {
  const [estimate, setEstimate] = useState(currentTask.estimate);

  const handleChange = (value) => {
    setEstimate(value);

    axios
      .put(
        `http://localhost:8000/api/tasks/${currentTask.number}`,
        { estimate: value },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch(console.log);
  };

  return (
    <div>
      <FormControl
        type="number"
        value={estimate}
        onChange={(e) => handleChange(e.target.value)}
      ></FormControl>
    </div>
  );
}
