import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/users`, formData, {
        withCredentials: true,
      });
      localStorage.setItem("userID", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);
      navigate("/welcome");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      console.error("Error:", err.response?.data?.errors);
    }
  };

  const inputFields = [
    { name: "email", type: "email", placeholder: "Enter email address" },
    { name: "name", type: "text", placeholder: "Enter full name" },
    { name: "password", type: "password", placeholder: "Create password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
    },
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 p-4 shadow rounded border bg-white">
          <h1 className="text-center fw-bold mb-4 text-primary">SprintGrid</h1>
          <p className="text-center text-muted mb-4">
            Sign up for your account
          </p>
          <form onSubmit={handleSubmit}>
            {inputFields.map(({ name, type, placeholder }) => (
              <div className="mb-3" key={name}>
                <input
                  className="form-control text-center"
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                />
                {errors[name] && (
                  <div className="text-danger small mt-1">
                    {errors[name]?.properties?.message}
                  </div>
                )}
              </div>
            ))}
            <div className="d-grid">
              <button className="btn btn-primary btn-lg" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none">
              Already have an account? <strong>Log in</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
