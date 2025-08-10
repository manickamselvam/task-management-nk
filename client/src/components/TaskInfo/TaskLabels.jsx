import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-dropdown-select";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TaskLabels({ currentTask }) {
  const [labels, setLabels] = useState(currentTask.labels || []);
  const [allLabels, setAllLabels] = useState([]);

  // Fetch all available labels (if you want to allow selecting from all labels)
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/labels`, { withCredentials: true }) // assuming you have an endpoint to get all labels
      .then((res) => {
        setAllLabels(res.data || []);
      })
      .catch(console.log);
  }, []);

  const handleChange = (values) => {
    const newLabels = values.map((val) => val.value);
    setLabels(newLabels);

    axios
      .put(
        `${API_BASE_URL}/tasks/${currentTask.number}`,
        { labels: newLabels },
        { withCredentials: true }
      )
      .then((res) => {
        // Optional: you can update currentTask or show a success message here
      })
      .catch(console.log);
  };

  if (!labels) return "Loading...";

  return (
    <div style={{ minWidth: 300 }}>
      <Select
        options={allLabels.map((label) => ({ value: label, label }))}
        onChange={handleChange}
        multi
        clearable
        searchable
        create
        values={labels.map((label) => ({ value: label, label }))}
        placeholder="Select or create labels"
        dropdownHandle={false}
      />
    </div>
  );
}
