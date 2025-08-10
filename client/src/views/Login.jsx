import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(""); // clear previous errors

    try {
      const { data } = await Axios.post(
        `${API_BASE_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("userID", data.user._id);
      localStorage.setItem("userName", data.user.name);
      navigate("/home");
    } catch (err) {
      setErrors(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 shadow rounded bg-white"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold">SprintGrid</h2>
        <h5 className="text-center mb-3">Log in to your account</h5>

        {errors && (
          <div className="alert alert-danger py-2 text-center" role="alert">
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Continue
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register">Sign up for an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
