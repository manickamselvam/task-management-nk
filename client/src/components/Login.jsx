// Login.jsx
import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post("/api/auth/login", values);
      onLoginSuccess?.(res.data.user);
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const Wrapper = ({ children }) => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            {errors.general && (
              <div className="text-red-500 text-sm text-center">
                {errors.general}
              </div>
            )}

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="flex justify-between text-sm">
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => alert("Gmail login placeholder")}
                className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Login with Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
