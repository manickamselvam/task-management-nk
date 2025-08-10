// import React, { useState } from "react";
// import { Link, navigate } from "@reach/router";
// import Axios from "axios";

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     const user = {
//       email,
//       password,
//     };
//     Axios.post("http://localhost:8000/api/users/login", user, {
//       withCredentials: true,
//     })
//       .then((res) => {
//         localStorage.setItem("userID", res.data.user._id);
//         localStorage.setItem("userName", res.data.user.name);
//         navigate("/home");
//       })
//       .catch((err) => {
//         setErrors(err.response.data.message);
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
//               Log in to your account
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               {errors && <span className="text-danger">{errors}</span>}
//             </div>
//             <div className="row">
//               <input
//                 className="col text-center m-3"
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="row">
//               <input
//                 className="col text-center m-3"
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="row my-3">
//               <div className="col text-center">
//                 <button type="submit" className="btn btn-primary">
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </form>
//           <div className="row my-3">
//             <div className="col text-center">
//               <Link to="/register">Sign up for an account</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate(); // replaces navigate from @reach/router

  function handleSubmit(e) {
    e.preventDefault();
    const user = { email, password };

    Axios.post("http://localhost:8000/api/users/login", user, {
      withCredentials: true,
    })
      .then((res) => {
        localStorage.setItem("userID", res.data.user._id);
        localStorage.setItem("userName", res.data.user.name);
        navigate("/home"); // works the same in react-router-dom
      })
      .catch((err) => {
        setErrors(err.response?.data?.message || "Login failed");
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
              Log in to your account
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {errors && <span className="text-danger">{errors}</span>}
            </div>
            <div className="row">
              <input
                className="col text-center m-3"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row">
              <input
                className="col text-center m-3"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row my-3">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">
                  Continue
                </button>
              </div>
            </div>
          </form>
          <div className="row my-3">
            <div className="col text-center">
              <Link to="/register">Sign up for an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
