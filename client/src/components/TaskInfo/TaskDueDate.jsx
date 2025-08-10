import React, { useState } from "react";
import axios from "axios";
import { FormControl } from "react-bootstrap";

export default function TaskDueDate({ currentTask }) {
  const [dueDate, setDueDate] = useState(currentTask.dueDate);

  const handleChange = (value) => {
    // console.log('this is the date being passed in: ', value);
    // console.log('this is the current task: ', currentTask);
    setDueDate(value);

    axios
      .put(
        `http://localhost:8000/api/tasks/${currentTask._id}`,
        { dueDate: value },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch(console.log);
  };

  return (
    <div>
      <h5>Due Date</h5>
      <FormControl
        type="date"
        value={dueDate}
        selected={dueDate}
        onChange={(e) => handleChange(e.target.value)}
      ></FormControl>
    </div>
  );
}
