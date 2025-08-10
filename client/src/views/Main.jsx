import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewTask from "../components/NewTask";
import TaskParent from "../components/TaskParent";
import ProjectSettings from "../components/ProjectSettings";
import Axios from "axios";
import io from "socket.io-client";
import styles from "../components/main.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [view, setView] = useState("tasks");
  const [taskDetails, setTaskDetails] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      navigate("/login");
      return;
    }

    const socket = io(":8000");

    const fetchData = async () => {
      try {
        const projRes = await Axios.get(
          `${API_BASE_URL}/projects/user/${userID}`,
          { withCredentials: true }
        );

        if (!projRes.data?.length) {
          navigate("/welcome");
          return;
        }

        setProjects(projRes.data);
        setCurrentProject(projRes.data[0]);
        setTasks(projRes.data[0]?.tasks || []);
        setFilteredTasks(projRes.data[0]?.tasks || []);

        const usersRes = await Axios.get(`${API_BASE_URL}/users`, {
          withCredentials: true,
        });
        setUsers(usersRes.data);

        if (id) {
          const taskRes = await Axios.get(`${API_BASE_URL}/tasks/${id}`, {
            withCredentials: true,
          });
          setTaskDetails(taskRes.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();

    socket.on("new task added", (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    return () => {
      socket.disconnect();
    };
  }, [id, navigate]);

  if (!projects.length) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading projects...
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Header
            showModal={() => setIsModalOpen(true)}
            setCurrentProject={setCurrentProject}
            projects={projects}
            setProjects={setProjects}
            setTasks={setTasks}
            setFilteredTasks={setFilteredTasks}
          />
        </div>
      </div>

      {/* Custom Modal (Tailwind) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Create Issue</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <NewTask
                closeModal={() => setIsModalOpen(false)}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                projects={projects}
                users={users}
              />
            </div>
          </div>
        </div>
      )}

      <div className={styles.main}>
        <Sidebar
          tasks={tasks}
          setTasks={setTasks}
          filteredTasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
          setCurrentView={setView}
          currentProj={currentProject}
          allProjects={projects}
          setCurrentProj={setCurrentProject}
          setAllProjects={setProjects}
        />
        {view === "tasks" ? (
          <TaskParent
            id={id}
            task={taskDetails}
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
            currentProject={currentProject}
            allUsers={users}
          />
        ) : (
          <ProjectSettings
            currentProj={currentProject}
            setCurrentView={setView}
            setCurrentProj={setCurrentProject}
            allProjects={projects}
            setAllProjects={setProjects}
          />
        )}
      </div>
    </>
  );
}
