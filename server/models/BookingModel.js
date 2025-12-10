import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    seats: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "confirmed" },
    bookedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "Bookings",
  }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
