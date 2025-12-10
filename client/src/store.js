import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/UserSlice";
import ActivityReducer from "./features/ActivitySlice";
import BookingReducer from "./features/BookingSlice";

const store = configureStore({
  reducer: {
    users: UserReducer,
    activities: ActivityReducer,
    bookings: BookingReducer,
  },
});

export default store;
