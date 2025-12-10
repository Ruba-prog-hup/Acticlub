import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async ({ userId, activityId, seats }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        userId,
        activityId,
        seats,
      });
      return res.data; 
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create booking";
      return rejectWithValue(msg);
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "bookings/getUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/user/${userId}`
      );
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load bookings";
      return rejectWithValue(msg);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete booking";
      return rejectWithValue(msg);
    }
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async ({ id, seats }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { seats }
      );
      return res.data; 
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update booking";
      return rejectWithValue(msg);
    }
  }
);


const BookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    clearBookingMessage(state) {
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const newBooking = action.payload;
        const idx = state.bookings.findIndex((b) => b._id === newBooking._id);
        if (idx !== -1) {
          state.bookings[idx] = newBooking;
        } else {
          state.bookings.push(newBooking);
        }

        state.message = "Booking confirmed";
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getUserBookings.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload || [];
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.bookings.findIndex((b) => b._id === updated._id);
        if (idx !== -1) {
          state.bookings[idx] = updated;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });   
  },
});

export const { clearBookingMessage } = BookingSlice.actions;
export default BookingSlice.reducer;
