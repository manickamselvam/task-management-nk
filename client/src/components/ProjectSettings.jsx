import React, { useState, useEffect } from "react";
import Axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectSettings = ({
  setCurrentView,
  currentProj,
  setCurrentProj,
  allProjects,
  setAllProjects,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectUsers, setProjectUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, projectRes] = await Promise.all([
          Axios.get(`${API_BASE_URL}/users`),
          Axios.get(`${API_BASE_URL}/projects/${currentProj._id}`),
        ]);

        setAllUsers(usersRes.data);
        setProjectName(projectRes.data.name);
        setProjectUsers(projectRes.data.users);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (currentProj) {
      fetchData();
    }
  }, [currentProj]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectUpdates = {
      name: projectName,
      users: projectUsers.map((user) => user._id),
    };

    // Update state immutably
    setAllProjects((prev) =>
      prev.map((project) =>
        project._id === currentProj._id
          ? { ...project, name: projectName }
          : project
      )
    );

    setCurrentProj((prev) => ({ ...prev, name: projectName }));

    try {
      await Axios.put(
        `${API_BASE_URL}/projects/${currentProj._id}`,
        projectUpdates,
        { withCredentials: true }
      );
      setCurrentView("tasks");
    } catch (err) {
      console.error(err);
    }
  };

  const addUser = () => {
    if (selectedUserIndex === "") return;
    const userToAdd = allUsers[selectedUserIndex];
    if (!projectUsers.find((u) => u._id === userToAdd._id)) {
      setProjectUsers((prev) => [...prev, userToAdd]);
    }
    setSelectedUserIndex("");
  };

  const removeUser = (userID) => {
    setProjectUsers((prev) => prev.filter((user) => user._id !== userID));
  };

  if (!currentProj) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
        <h2 className="mb-4">Project Settings</h2>

        {/* Project Name */}
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-6">
            <input
              className="form-control"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Add User */}
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Add User:</label>
          <div className="col-sm-6 d-flex gap-2">
            <select
              className="form-control"
              value={selectedUserIndex}
              onChange={(e) => setSelectedUserIndex(e.target.value)}
            >
              <option value="">Select a user</option>
              {allUsers.map((user, index) => (
                <option key={user._id} value={index}>
                  {user.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={addUser} className="btn btn-primary">
              Add
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Users:</label>
          <div className="col-sm-8 d-flex flex-wrap gap-2">
            {projectUsers.map((user) => (
              <button
                type="button"
                key={user._id}
                onClick={() => removeUser(user._id)}
                className="btn btn-outline-secondary btn-sm"
              >
                {user.name} ×
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setCurrentView("tasks")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectSettings;
