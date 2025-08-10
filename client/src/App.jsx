import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Registration from "./views/Registration";
import Main from "./views/Main";
import NewUser from "./views/NewUser";

function App() {
  return (
    <div className="App bg-light min-vh-100 d-flex flex-column">
      <header className="bg-primary text-white text-center py-3 shadow-sm">
        <h1 className="h3 m-0">SprintGrid</h1>
      </header>

      <main className="flex-grow-1 container py-4">
        <BrowserRouter>
          <Routes>
            {/* Redirect root to registration */}
            <Route path="/" element={<Navigate to="/register" replace />} />

            {/* Auth pages */}
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />

            {/* Main pages */}
            <Route path="/home" element={<Main />} />
            <Route path="/home/geer/:id" element={<Main />} />

            {/* Welcome page */}
            <Route path="/welcome" element={<NewUser />} />
          </Routes>
        </BrowserRouter>
      </main>

      <footer className="bg-dark text-white text-center py-2 small">
        &copy; {new Date().getFullYear()} SprintGrid. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
