// // src/pages/ForgotPassword.jsx
// import { useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const ForgotPassword = () => {
//   const [successMsg, setSuccessMsg] = useState("");

//   const initialValues = { email: "" };
//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//   });

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/forgot-password",
//         values
//       );
//       setSuccessMsg(res.data.message);
//       resetForm();
//     } catch (error) {
//       setSuccessMsg(error.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Forgot Password</h2>
//       {successMsg && <p>{successMsg}</p>}
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form>
//           <label>Email:</label>
//           <Field name="email" type="email" />
//           <ErrorMessage name="email" component="div" />
//           <button type="submit">Send Reset Link</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default ForgotPassword;

// ForgotPassword.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const handleForgotPassword = (values) => {
    alert(`Password reset link sent to ${values.email}`);
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
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email is required"),
        })}
        onSubmit={handleForgotPassword}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Forgot Password
            </h2>

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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send Reset Link
            </button>

            <Link
              to="/login"
              className="block text-center w-full py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Back to Login
            </Link>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;
