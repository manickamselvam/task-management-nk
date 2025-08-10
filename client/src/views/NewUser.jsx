import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NewUser() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no user ID
    if (!localStorage.getItem("userID")) {
      navigate("/login");
    }
  }, [navigate]);

  const createProject = async () => {
    if (!name.trim()) {
      setError("Project name cannot be empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${API_BASE_URL}/projects`,
        { name, users: [localStorage.getItem("userID")] },
        { withCredentials: true }
      );
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to Geera, {user}!</h1>
        <p className="text-gray-600 mb-6">
          Get started by creating your first project 🚀
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a project name..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="button"
          onClick={createProject}
          disabled={loading}
          className={`w-full mt-4 py-3 px-4 text-white font-semibold rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>
    </div>
  );
}
