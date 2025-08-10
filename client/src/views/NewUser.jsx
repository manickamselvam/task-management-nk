// import React, { useState } from "react";
// import axios from "axios";
// import { navigate } from "@reach/router";
// import { useEffect } from "react";

// export default function NewUser() {
//   const [name, setName] = useState("");
//   const user = localStorage.getItem("userName");

//   useEffect(() => {
//     //Make sure a user is logged in if not then redirect to login
//     if (localStorage.getItem("userID") === null) {
//       navigate("/login");
//       return;
//     }
//   });

//   const createProject = () => {
//     axios
//       .post(
//         "http://localhost:8000/api/projects",
//         { name, users: [localStorage.getItem("userID")] },
//         { withCredentials: true }
//       )
//       .then(() => {
//         return navigate("/home");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "48px" }}>
//       <h1>Welcome to Geera {user}!</h1>
//       <p>Get started by creating your first project!</p>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="enter a project name..."
//         style={{ display: "block", margin: "12px auto", padding: "4px" }}
//       />
//       <button type="button" onClick={createProject} className="btn btn-primary">
//         Create Project!
//       </button>
//     </div>
//   );
// }

// New Code

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [name, setName] = useState("");
  const user = localStorage.getItem("userName");

  const navigate = useNavigate();

  useEffect(() => {
    // Make sure a user is logged in; if not, redirect to login
    if (!localStorage.getItem("userID")) {
      navigate("/login");
    }
  }, [navigate]);

  const createProject = () => {
    axios
      .post(
        "http://localhost:8000/api/projects",
        { name, users: [localStorage.getItem("userID")] },
        { withCredentials: true }
      )
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: "center", margin: "48px" }}>
      <h1>Welcome to Geera {user}!</h1>
      <p>Get started by creating your first project!</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="enter a project name..."
        style={{ display: "block", margin: "12px auto", padding: "4px" }}
      />
      <button type="button" onClick={createProject} className="btn btn-primary">
        Create Project!
      </button>
    </div>
  );
}
