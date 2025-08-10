// import React, { useState } from "react";
// import Axios from "axios";
// import { navigate, Link } from "@reach/router";

// const Registration = (props) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const newUser = {
//       email,
//       name,
//       password,
//       confirmPassword,
//     };
//     Axios.post("http://localhost:8000/api/users", newUser, {
//       withCredentials: true,
//     })
//       .then((res) => {
//         // console.log("User created successfully: " + res.data.user_id);
//         localStorage.setItem("userID", res.data.user._id);
//         localStorage.setItem("userName", res.data.user.name);
//         navigate("/welcome");
//       })
//       .catch((err) => {
//         setErrors(err.response.data.errors);
//         console.log("Error :", err.response.data.errors);
//       });
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col text-center">
//           <h1>Geera</h1>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-6 container shadow rounded border">
//           <div className="row my-3">
//             <div className="col font-weight-bold text-center">
//               Sign up for your account
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               {errors && (
//                 <span className="text-danger">
//                   {errors?.email?.properties?.message}
//                 </span>
//               )}
//             </div>
//             <div className="row">
//               <input
//                 className="col text-center m-3"
//                 type="email"
//                 placeholder="Enter email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="row">
//               {errors && (
//                 <span className="text-danger">
//                   {errors?.name?.properties?.message}
//                 </span>
//               )}
//             </div>
//             <div className="row">
//               <input
//                 className="col text-center m-3"
//                 type="text"
//                 placeholder="Enter full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="row">
//               {errors && (
//                 <span className="text-danger">
//                   {errors?.password?.properties?.message}
//                 </span>
//               )}
//             </div>
//             <div className="row">
//               <input
//                 className="col text-center m-3"
//                 type="password"
//                 placeholder="Create password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="row">
//               {errors && (
//                 <span className="text-danger">
//                   {errors?.confirmPassword?.properties?.message}
//                 </span>
//               )}
//             </div>
//             <div className="row">
//               <input
//                 className="col text-center m-3"
//                 type="password"
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//             <div className="row my-3">
//               <div className="col text-center">
//                 <button className="btn btn-primary">Sign Up</button>
//               </div>
//             </div>
//           </form>
//           <div className="row my-3">
//             <div className="col text-center">
//               <Link to="/login">Already have an account? Log in</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;

import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      email,
      name,
      password,
      confirmPassword,
    };
    Axios.post("http://localhost:8000/api/users", newUser, {
      withCredentials: true,
    })
      .then((res) => {
        localStorage.setItem("userID", res.data.user._id);
        localStorage.setItem("userName", res.data.user.name);
        navigate("/welcome");
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        console.log("Error :", err.response.data.errors);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h1>Geera</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6 container shadow rounded border">
          <div className="row my-3">
            <div className="col font-weight-bold text-center">
              Sign up for your account
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {errors && (
                <span className="text-danger">
                  {errors?.email?.properties?.message}
                </span>
              )}
            </div>
            <div className="row">
              <input
                className="col text-center m-3"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row">
              {errors && (
                <span className="text-danger">
                  {errors?.name?.properties?.message}
                </span>
              )}
            </div>
            <div className="row">
              <input
                className="col text-center m-3"
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row">
              {errors && (
                <span className="text-danger">
                  {errors?.password?.properties?.message}
                </span>
              )}
            </div>
            <div className="row">
              <input
                className="col text-center m-3"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row">
              {errors && (
                <span className="text-danger">
                  {errors?.confirmPassword?.properties?.message}
                </span>
              )}
            </div>
            <div className="row">
              <input
                className="col text-center m-3"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="row my-3">
              <div className="col text-center">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </form>
          <div className="row my-3">
            <div className="col text-center">
              <Link to="/login">Already have an account? Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
