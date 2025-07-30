import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout, hasPermission, UserRoles } from "../store/slices/authSlice";
import {
  addNewUser,
  updateUserRole,
  loadUsersFromStorage,
} from "../store/slices/usersSlice";
import {
  Users,
  LogOut,
  UserPlus,
  Shield,
  Crown,
  User,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const { allUsers, addUserLoading } = useAppSelector((state) => state.users);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Load users from storage on component mount
  useEffect(() => {
    dispatch(loadUsersFromStorage());
  }, [dispatch]);

  // Filter users based on current user's role
  const getFilteredUsers = () => {
    if (!currentUser) return [];

    const { role } = currentUser;

    switch (role) {
      case UserRoles.SUPER_ADMIN:
        // Super Admin can see everyone except themselves
        return allUsers.filter((user) => user.id !== currentUser.id);

      case UserRoles.ADMIN:
        // Admin can see only users (not other admins or super admin)
        return allUsers.filter(
          (user) => user.role === UserRoles.USER && user.id !== currentUser.id
        );

      case UserRoles.USER:
        // Users can't see other users
        return [];

      default:
        return [];
    }
  };

  const filteredUsers = getFilteredUsers();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully!");
  };

  // Handle role change
  const handleRoleChange = (userId, currentRole) => {
    if (
      !hasPermission(currentUser?.role, "promote_user_to_admin") &&
      !hasPermission(currentUser?.role, "demote_admin_to_user")
    ) {
      return;
    }

    let newRole;
    if (
      currentRole === UserRoles.USER &&
      hasPermission(currentUser?.role, "promote_user_to_admin")
    ) {
      newRole = UserRoles.ADMIN;
    } else if (
      currentRole === UserRoles.ADMIN &&
      hasPermission(currentUser?.role, "demote_admin_to_user")
    ) {
      newRole = UserRoles.USER;
    }

    if (newRole) {
      dispatch(updateUserRole({ userId, newRole }));
    }
  };

  // Get role badge styling
  const getRoleBadge = (role) => {
    const styles = {
      [UserRoles.SUPER_ADMIN]:
        "bg-purple-100 text-purple-800 border-purple-200",
      [UserRoles.ADMIN]: "bg-blue-100 text-blue-800 border-blue-200",
      [UserRoles.USER]: "bg-green-100 text-green-800 border-green-200",
    };

    const icons = {
      [UserRoles.SUPER_ADMIN]: <Crown className="w-3 h-3" />,
      [UserRoles.ADMIN]: <Shield className="w-3 h-3" />,
      [UserRoles.USER]: <User className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[role]}`}
      >
        {icons[role]}
        {role.replace("_", " ")}
      </span>
    );
  };

  // Dashboard stats
  const stats = [
    {
      title: "Total Users",
      value: filteredUsers.filter((u) => u.role === UserRoles.USER).length,
      icon: <Users className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-50 border-green-200",
    },
    {
      title: "Admins",
      value: filteredUsers.filter((u) => u.role === UserRoles.ADMIN).length,
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-50 border-blue-200",
      show: currentUser?.role === UserRoles.SUPER_ADMIN,
    },
    {
      title: "Your Role",
      value: currentUser?.role?.replace("_", " "),
      icon:
        currentUser?.role === UserRoles.SUPER_ADMIN ? (
          <Crown className="w-6 h-6 text-purple-600" />
        ) : currentUser?.role === UserRoles.ADMIN ? (
          <Shield className="w-6 h-6 text-blue-600" />
        ) : (
          <User className="w-6 h-6 text-green-600" />
        ),
      bgColor:
        currentUser?.role === UserRoles.SUPER_ADMIN
          ? "bg-purple-50 border-purple-200"
          : currentUser?.role === UserRoles.ADMIN
          ? "bg-blue-50 border-blue-200"
          : "bg-green-50 border-green-200",
    },
    {
      title: "Total People",
      value: allUsers.length,
      icon: <Users className="w-6 h-6 text-gray-600" />,
      bgColor: "bg-gray-50 border-gray-200",
      show: currentUser?.role === UserRoles.SUPER_ADMIN,
    },
  ].filter((stat) => stat.show !== false);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Please sign in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {currentUser?.firstName} {currentUser?.lastName}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {hasPermission(currentUser?.role, "add_user") && (
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              )}

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="flex-shrink-0">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                {currentUser?.role === UserRoles.SUPER_ADMIN
                  ? "All Users & Admins"
                  : "Users"}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {filteredUsers.length}{" "}
                  {filteredUsers.length === 1 ? "person" : "people"}
                </span>
              </div>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-500">
                {hasPermission(currentUser?.role, "add_user")
                  ? "Start by adding your first user."
                  : "No users to display based on your permissions."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.firstName?.charAt(0)}
                                {user.lastName?.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {(user.role === UserRoles.USER &&
                          hasPermission(
                            currentUser?.role,
                            "promote_user_to_admin"
                          )) ||
                        (user.role === UserRoles.ADMIN &&
                          hasPermission(
                            currentUser?.role,
                            "demote_admin_to_user"
                          )) ? (
                          <button
                            onClick={() => handleRoleChange(user.id, user.role)}
                            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              user.role === UserRoles.USER
                                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                : "text-orange-600 bg-orange-50 hover:bg-orange-100"
                            }`}
                          >
                            {user.role === UserRoles.USER ? (
                              <>
                                <TrendingUp className="w-4 h-4 mr-1" />
                                Promote to Admin
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-4 h-4 mr-1" />
                                Demote to User
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No actions available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          canAddAdmin={hasPermission(currentUser?.role, "add_admin")}
          loading={addUserLoading}
        />
      )}
    </div>
  );
};

// Add User Modal Component
const AddUserModal = ({ onClose, canAddAdmin, loading }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: UserRoles.USER,
  });

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      addNewUser({
        userData: formData,
        role: formData.role,
      })
    )
      .unwrap()
      .then(() => {
        onClose();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          role: UserRoles.USER,
        });
        alert("User added successfully!");
      })
      .catch((error) => {
        alert(`Error adding user: ${error}`);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            disabled={loading}
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value={UserRoles.USER}>User</option>
              {canAddAdmin && <option value={UserRoles.ADMIN}>Admin</option>}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
