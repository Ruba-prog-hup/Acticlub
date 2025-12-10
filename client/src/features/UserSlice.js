import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://acticlub2.onrender.com/api/auth/login",
        userData
      );
      return res.data; 
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

// REGISTER
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://acticlub2.onrender.com/api/auth/register",
        userData
      );
      return res.data; 
    } catch (err) {
      const msg = err.response?.data?.message || "Register failed";
      return rejectWithValue(msg);
    }
  }
);

const storedUser = JSON.parse(localStorage.getItem("acticlubUser") || "null");

const initialState = {
  user: storedUser,
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("acticlubUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.message || "Registered";
        localStorage.setItem(
          "acticlubUser",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
        localStorage.setItem(
          "acticlubUser",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;

