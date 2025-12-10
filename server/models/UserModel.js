import mongoose from "mongoose";




const UserSchema = new mongoose.Schema(
  {
    uname: { type: String, required: true },       
    email: { type: String, required: true, unique: true },
    dateBirth: { type: String },                    
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: "Users", 
  }
);


const UserModel = mongoose.model("User", UserSchema);
export default UserModel;