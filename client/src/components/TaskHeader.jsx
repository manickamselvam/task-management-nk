import React, { useState } from "react";
import styles from "./header.module.css";

export default function TaskHeader({ currentProject, setFilteredTasks }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        <span className="animate-pulse">Loading project...</span>
      </div>
    );
  }

  const tasks = currentProject.tasks || [];

  const performSearch = (e) => {
    e.preventDefault();
    const term = search.trim().toLowerCase();
    if (!term) return;

    setFilteredTasks(
      tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
      )
    );
    setSearching(true);
  };

  const clearSearch = () => {
    setFilteredTasks(tasks);
    setSearch("");
    setSearching(false);
  };

  return (
    <div className="mt-3 space-y-3">
      <p className="text-secondary text-sm">Project / {currentProject.name}</p>
      <h4 className="font-semibold text-lg">All Issues</h4>

      <form onSubmit={performSearch} className="flex gap-2 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className={`${styles.search} flex-1 px-3 py-2 border rounded-md`}
        />
        <button
          type="submit"
          className={`${styles.searchButton} px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
          disabled={!search.trim()}
        >
          Search
        </button>
        {searching && (
          <button
            type="button"
            onClick={clearSearch}
            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
}
