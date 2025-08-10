import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import {
  Dropdown,
  ButtonGroup,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Folder, LogOut } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Header({
  projects,
  setProjects,
  setCurrentProject,
  setTasks,
  setFilteredTasks,
  showModal,
}) {
  const navigate = useNavigate();

  const selectProject = (project) => {
    setCurrentProject(project);
    Axios.get(`${API_BASE_URL}/projects/${project._id}`).then((res) => {
      setTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);
    });
  };

  const createProject = () => {
    const name = document.getElementById("projectName").value.trim();
    if (!name) return;

    Axios.post(
      `${API_BASE_URL}/projects`,
      { name, users: [localStorage.getItem("userID")] },
      { withCredentials: true }
    )
      .then((res) => {
        setProjects((prev) => [...prev, res.data.project]);
        document.getElementById("projectName").value = "";
      })
      .catch((err) => console.error(err));
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    Axios.get(
      `${API_BASE_URL}/projects/user/${localStorage.getItem("userID")}`,
      { withCredentials: true }
    ).then((projects) => {
      setProjects(projects.data);
    });
  }, [setProjects]);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img className={styles.logo} src="/logo192.png" alt="logo" />
        <span className={styles.brandName}>Geera Software</span>

        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            variant="link"
            className={styles.headerLinks}
            style={{ textDecoration: "none" }}
          >
            <Folder size={16} style={{ marginRight: "6px" }} />
            Projects
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ maxHeight: "250px", overflowY: "auto", minWidth: "220px" }}
          >
            {projects?.map((project) => (
              <Dropdown.Item
                key={project._id}
                onClick={() => selectProject(project)}
              >
                {project.name}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <div className="px-3 py-2">
              <FormControl
                id="projectName"
                type="text"
                placeholder="New project name"
                className="mb-2"
              />
              <button
                className="btn btn-sm btn-primary w-100"
                onClick={createProject}
              >
                <Plus size={14} /> Create Project
              </button>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <span className={styles.headerLinks}>Filters</span>
        <button className={styles.createButton} onClick={showModal}>
          Create
        </button>
      </div>

      <NavDropdown
        title={
          <div className={styles.logoDiv}>
            <img
              className={styles.userLogo}
              src="/user-placeholder.png"
              alt="user"
            />
            <span className={styles.userProfileText}>
              {localStorage.getItem("userName") || "User"}
            </span>
          </div>
        }
        id="nav-dropdown"
        align="end"
      >
        <NavDropdown.ItemText>
          {localStorage.getItem("userName")}
        </NavDropdown.ItemText>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={signOut}>
          <LogOut size={14} style={{ marginRight: "6px" }} /> Sign Out
        </NavDropdown.Item>
      </NavDropdown>
    </header>
  );
}
