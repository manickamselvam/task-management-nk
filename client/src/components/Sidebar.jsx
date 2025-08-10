import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Settings,
  ListTodo,
  CheckCircle2,
  CircleDot,
  Circle,
} from "lucide-react";

export default function Sidebar({
  setTasks,
  tasks,
  setFilteredTasks,
  setCurrentView,
  currentProj,
  allProjects,
  setAllProjects,
  setCurrentProj,
}) {
  const [selected, setSelected] = useState("3");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  if (!currentProj) return <div className="p-4 text-gray-500">Loading...</div>;

  const handleClick = (id) => {
    setSelected(id);
    setCurrentView("tasks");

    const uid = localStorage.getItem("userID");

    const filters = {
      1: tasks.filter((task) => task.assignee === uid && task.status === "0"),
      2: tasks.filter((task) => task.creator === uid),
      3: tasks,
      4: tasks.filter((task) => task.status === "0"),
      5: tasks.filter((task) => task.status === "1"),
    };

    setFilteredTasks(filters[id] || tasks);
  };

  const deleteProject = () => {
    Axios.delete(
      `${import.meta.env.VITE_API_URL}/api/projects/${currentProj._id}`
    )
      .then(() => {
        setShowConfirm(false);
        const tempProjects = allProjects.filter(
          (project) => project._id !== currentProj._id
        );
        setAllProjects(tempProjects);

        if (tempProjects.length < 1) {
          navigate("/welcome");
        } else {
          setCurrentProj(tempProjects[0]);
          setTasks(tempProjects[0].tasks);
          setFilteredTasks(tempProjects[0].tasks);
        }
      })
      .catch(console.error);
  };

  const menuItems = [
    { id: "1", label: "My open issues", icon: CircleDot },
    { id: "2", label: "Reported by me", icon: Circle },
    { id: "3", label: "All issues", icon: ListTodo },
    { id: "4", label: "Open issues", icon: Circle },
    { id: "5", label: "Done issues", icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r shadow-sm">
      {/* Project Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          className="w-8 h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Picasa.svg/256px-Picasa.svg.png"
          alt="logo"
        />
        <span className="font-semibold text-lg">{currentProj.name}</span>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <p className="px-4 py-2 text-xs text-gray-500 uppercase">
          Issues and Filters
        </p>

        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 ${
              selected === id ? "bg-gray-200 font-medium" : "text-gray-700"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}

        <div className="border-t my-2" />

        <button
          onClick={() => {
            setSelected("6");
            setCurrentView("settings");
          }}
          className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 ${
            selected === "6" ? "bg-gray-200 font-medium" : "text-gray-700"
          }`}
        >
          <Settings size={16} />
          Project Settings
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete Project
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="font-semibold text-lg mb-2">
              Delete {currentProj.name}?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Deleting this project will also remove all its tasks permanently.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
