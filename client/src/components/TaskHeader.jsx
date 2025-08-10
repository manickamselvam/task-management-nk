import React, { useState } from "react";
import styles from "./header.module.css";

export default function TaskHeader({ currentProject, setFilteredTasks }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  if (currentProject == null) return "Loading...";

  const tasks = currentProject.tasks;

  const performSearch = () => {
    setFilteredTasks(
      tasks.filter(
        (task) =>
          task.name.includes(search) || task.description.includes(search)
      )
    );
    setSearching(true);
  };

  const clearSearch = () => {
    setFilteredTasks(currentProject.tasks);
    setSearch("");
    setSearching(false);
  };

  return (
    <div className="mt-3">
      <p className="text-secondary">Project / {currentProject.name}</p>
      <h4>All issues</h4>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />
      <button
        type="submit"
        onClick={performSearch}
        className={styles.searchButton}
        disabled={search === ""}
      >
        Advanced search
      </button>
      {searching && (
        <button onClick={clearSearch} className={styles.searchButton}>
          Clear Search
        </button>
      )}
    </div>
  );
}
