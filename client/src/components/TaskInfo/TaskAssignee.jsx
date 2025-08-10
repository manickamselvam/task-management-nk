import React, { useState } from "react";
import axios from "axios";
import { FormControl } from "react-bootstrap";
// import Select from 'react-dropdown-select';
import styles from "./task.module.css";

export default function TaskAssignee({
  currentTask,
  allUsers,
  // errors,
  // setErrors,
}) {
  const [assignee, setAssignee] = useState(
    currentTask.assignee === null ? "Unassigned" : currentTask.assignee
  );
  const handleChange = (value) => {
    setAssignee(value);
    if (value === "Unassigned") {
      value = null;
    }

    axios
      .put(
        `http://localhost:8000/api/tasks/${currentTask._id}`,
        { assignee: value },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch(console.log);
    // (err) => setErrors([...errors, err.response.data.message]));
  };

  if (assignee === undefined) return "Loading...";
  return (
    <div className={styles.dropdown}>
      <h5>Assignee</h5>
      <FormControl
        as="select"
        value={assignee}
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
                    allUsers.find((user) => user._id === currentTask.assignee),
                ]}
                // placeholder={assignee.name}
            /> */}
    </div>
  );
}
