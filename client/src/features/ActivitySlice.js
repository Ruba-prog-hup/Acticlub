import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActivities = createAsyncThunk(
  "activities/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://acticlub2.onrender.com/api/activities");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load activities");
    }
  }
);

export const createActivity = createAsyncThunk(
  "activities/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://acticlub2.onrender.com/api/activities",
        data
      );
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create activity";
      return rejectWithValue(msg);
    }
  }
);

export const updateActivity = createAsyncThunk(
  "activities/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://acticlub2.onrender.com/api/activities/${id}`,
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to update activity");
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://acticlub2.onrender.com/api/activities/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete activity");
    }
  }
);

const ActivitySlice = createSlice({
  name: "activities",
  initialState: {
    list: [],
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const idx = state.list.findIndex((a) => a._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a._id !== action.payload);
      });
  },
});

export default ActivitySlice.reducer;

