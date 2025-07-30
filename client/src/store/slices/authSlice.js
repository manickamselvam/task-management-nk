import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// User roles
export const UserRoles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
};

// Permission checker
export const hasPermission = (userRole, action) => {
  const permissions = {
    [UserRoles.SUPER_ADMIN]: [
      "view_all_users",
      "view_all_admins",
      "add_user",
      "add_admin",
      "promote_user_to_admin",
      "demote_admin_to_user",
      "manage_all_roles",
    ],
    [UserRoles.ADMIN]: ["view_all_users", "add_user", "promote_user_to_admin"],
    [UserRoles.USER]: [],
  };

  return permissions[userRole]?.includes(action) || false;
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { users } = getState();

      // Check if email already exists
      const existingUser = users.allUsers.find(
        (user) => user.email === userData.email
      );
      if (existingUser) {
        return rejectWithValue("Email already exists");
      }

      // Determine role: first user is Super Admin, rest are Users
      const role =
        users.allUsers.length === 0 ? UserRoles.SUPER_ADMIN : UserRoles.USER;

      const newUser = {
        id: generateId(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: role,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      return { user: newUser };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { users } = getState();
      const user = users.allUsers.find((u) => u.email === credentials.email);

      if (!user) {
        return rejectWithValue("User not found");
      }

      // In a real app, you'd verify password here
      // For demo purposes, we'll accept any password

      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("currentUser");
    },
    clearError: (state) => {
      state.error = null;
    },
    loadUserFromStorage: (state) => {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
