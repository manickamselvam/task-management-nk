import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Registration from "./views/Registration";
// import { Router, Redirect } from "@reach/router";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./views/Main";
import NewUser from "./views/NewUser";

function App() {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    // <div className="App">
    //   <Router>
    //     <Redirect from="/" to="/register" noThrow />
    //     <Registration path="/register" />
    //     <Login path="/login" />
    //     <Main path="/home" onSubmit={onSubmit} />
    //     <Main path="/home/geer/:id" onSubmit={onSubmit} />
    //     <NewUser path="/welcome" />
    //   </Router>
    // </div>

    <div className="App">
      <Router>
        <Routes>
          {/* Redirect from "/" to "/register" */}
          <Route path="/" element={<Navigate to="/register" replace />} />

          {/* Pages */}
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Main onSubmit={onSubmit} />} />
          <Route path="/home/geer/:id" element={<Main onSubmit={onSubmit} />} />
          <Route path="/welcome" element={<NewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
