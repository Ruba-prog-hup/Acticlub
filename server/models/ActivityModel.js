import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    ageRange: { type: String, required: true },
    durationDays: { type: Number, required: true },
    price: { type: Number, required: true },
    eventDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
    collection: "Activities",
  }
);

const ActivityModel = mongoose.model("Activity", ActivitySchema);
export default ActivityModel;