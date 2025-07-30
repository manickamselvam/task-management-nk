import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";

// Components
import Register from "./pages/Register";
import SignInForm from "./pages/SignInForm";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Redux initialization component
const AppContent = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Default route redirects to sign-in */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          {/* Public Routes */}
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
