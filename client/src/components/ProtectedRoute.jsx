import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadUserFromStorage } from "../store/slices/authSlice";
import { loadUsersFromStorage } from "../store/slices/usersSlice";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Load user from storage on component mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(loadUsersFromStorage());
  }, [dispatch]);

  // If not authenticated, redirect to signin
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/signin" replace />;
  }

  // If specific role is required, check if user has permission
  if (requiredRole) {
    const hasRequiredRole = () => {
      switch (requiredRole) {
        case "SUPER_ADMIN":
          return currentUser.role === "SUPER_ADMIN";
        case "ADMIN":
          return ["SUPER_ADMIN", "ADMIN"].includes(currentUser.role);
        case "USER":
          return ["SUPER_ADMIN", "ADMIN", "USER"].includes(currentUser.role);
        default:
          return false;
      }
    };

    if (!hasRequiredRole()) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
