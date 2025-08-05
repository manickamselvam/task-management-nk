import React from "react";

const Dashboard = ({ user }) => {
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Role: {user.role}</p>

      {user.role === "admin" ? (
        <div>
          <h3>All Users</h3>
          {/* This would fetch and list all users (optional enhancement) */}
          <p>[All user listing here]</p>
        </div>
      ) : (
        <div>
          <h3>Your Profile</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
