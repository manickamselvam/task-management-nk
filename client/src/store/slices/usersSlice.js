import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserRoles } from "./authSlice";

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Async thunk for adding a new user
export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async ({ userData, role }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newUser = {
        id: generateId(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: role || UserRoles.USER,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating user role
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ userId, newRole }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { userId, newRole };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allUsers: [],
  loading: false,
  error: null,
  addUserLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsersFromStorage: (state) => {
      const savedUsers = localStorage.getItem("allUsers");
      if (savedUsers) {
        state.allUsers = JSON.parse(savedUsers);
      }
    },
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add new user cases
      .addCase(addNewUser.pending, (state) => {
        state.addUserLoading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.addUserLoading = false;
        state.allUsers.push(action.payload);
        state.error = null;
        localStorage.setItem("allUsers", JSON.stringify(state.allUsers));
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.addUserLoading = false;
        state.error = action.payload;
      })
      // Update user role cases
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, newRole } = action.payload;
        const userIndex = state.allUsers.findIndex(
          (user) => user.id === userId
        );
        if (userIndex !== -1) {
          state.allUsers[userIndex].role = newRole;
          localStorage.setItem("allUsers", JSON.stringify(state.allUsers));
        }
        state.error = null;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle registration from auth slice
      .addCase("auth/registerUser/fulfilled", (state, action) => {
        state.allUsers.push(action.payload.user);
        localStorage.setItem("allUsers", JSON.stringify(state.allUsers));
      });
  },
});

export const { loadUsersFromStorage, clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
