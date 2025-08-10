import React, { useState, useEffect } from "react";
import Axios from "axios";

const ProjectSettings = (props) => {
  const {
    setCurrentView,
    currentProj,
    setCurrentProj,
    allProjects,
    setAllProjects,
  } = props;
  const [projectName, setProjectName] = useState("");
  const [projectUsers, setProjectUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users").then((res) => {
      setAllUsers(res.data);
    });
    Axios.get("http://localhost:8000/api/projects/" + currentProj._id).then(
      (res) => {
        setProjectName(res.data.name);
        setProjectUsers(res.data.users);
      }
    );
  }, [currentProj]);

  //Handle update of project
  function handleSubmit(e) {
    e.preventDefault();
    const projectUpdates = {
      name: projectName,
      users: projectUsers.map((user) => user._id),
    };

    //Update allProjects with new project name so data updates on frontend
    setAllProjects(
      allProjects.map((project) => {
        if (project.name === currentProj.name) {
          project.name = projectName;
        }
        return project;
      })
    );
    //Update currentProj fields so data updates on frontend
    currentProj.name = projectName;
    setCurrentProj(currentProj);
    Axios.put(
      "http://localhost:8000/api/projects/" + currentProj._id,
      projectUpdates,
      { withCredentials: true }
    )
      .then((res) => {
        setCurrentView("tasks");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle adding a user to the project
  //Only adds locally does not push to server until hitting save
  function addUser(e) {
    e.preventDefault();
    const user = document.getElementById("userToAdd");
    setProjectUsers([...projectUsers, allUsers[user.value]]);
  }

  //Handle removing a user from the project
  //Only removes locally does not update server until hitting save
  function removeUser(userID) {
    setProjectUsers(projectUsers.filter((user) => user._id !== userID));
  }

  if (currentProj === null) return <div>Loading...</div>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row my-4 text-left">
          <h1>Project Settings</h1>
        </div>
        <div className="row my-2">
          <div className="col-2">
            <label>Name: </label>
          </div>
          <input
            className="col-3"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="row my-2">
          <div className="col-2">
            <label>Add User: </label>
          </div>
          <select id="userToAdd" className="col-3">
            {allUsers.map((user, index) => (
              <option key={index} value={index}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="col-2">
            <button onClick={addUser} className="btn btn-primary">
              Add User
            </button>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-2">
            <label>Users : </label>
          </div>
          <div className="col-7">
            {projectUsers.map((user, index) => (
              <div
                onClick={() => removeUser(user._id)}
                value={user._id}
                key={index}
                className="mr-2 btn btn-secondary"
              >
                {user.name} X
              </div>
            ))}
          </div>
        </div>
        <div className="row my-5">
          <div className="col-5">
            <div className="row">
              <div className="col-6 text-right">
                <div
                  onClick={() => setCurrentView("tasks")}
                  className="btn btn-secondary"
                >
                  Cancel
                </div>
              </div>
              <div className="col-6">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectSettings;
