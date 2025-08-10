import React, { useState } from "react";
import axios from "axios";
import { FormControl } from "react-bootstrap";
import styles from "./task.module.css";

export default function TaskReporter({
  currentTask,
  allUsers,
  // errors,
  // setErrors,
}) {
  const [reporter, setReporter] = useState(
    currentTask.creator === null ? "Unassigned" : currentTask.creator
  );
  const handleChange = (value) => {
    setReporter(value);
    if (value === "Unassigned") {
      value = null;
    }
    axios
      .put(
        `http://localhost:8000/api/tasks/${currentTask._id}`,
        { creator: value },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch(console.log);
    // (err) => setErrors([...errors, err.response.data.message]));
  };

  if (reporter === undefined) return "Loading...";
  return (
    <div className={styles.dropdown}>
      <h5>Reporter</h5>
      <FormControl
        as="select"
        value={reporter}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="Unassigned">Unassigned</option>
        {allUsers.map((user, idx) => {
          return (
            <option key={idx} value={user._id}>
              {user.name}
            </option>
          );
        })}
      </FormControl>
      {/* <Select
                options={allUsers}
                onChange={(values) => handleChange(values)}
                multi={false}
                clearable={true}
                searchable={true}
                dropdownHandle={false}
                labelField="name"
                values={[
                    allUsers.find((user) => user._id === currentTask.creator),
                ]}
            /> */}
    </div>
  );
}
