import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ActivityModel from "./models/ActivityModel.js";
import UserModel from "./models/UserModel.js";
import BookingModel from "./models/BookingModel.js";

const app = express();

app.use(cors());
app.use(express.json());


const MONGO_URI ="mongodb+srv://ray:1234@cluster0.eezejxf.mongodb.net/AntiClub?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo connection error:", err));


app.get("/", (req, res) => {
  res.send("ActiClub API is running");
});

// POST /api/auth/register
app.post("/api/auth/register", async (req, res) => {
  try {
    // لاحظي أني أضفت profilePic هنا 👇
    const { uname, email, password, dateBirth, role, profilePic } = req.body;

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already used" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      uname,
      email,
      password: hashed,
      dateBirth,
      profilePic: profilePic || "",   // الآن المتغيّر معروف
      role: role || "user",
    });

    res.status(201).json({
      message: "Registered",
      user: {
        _id: user._id,
        uname: user.uname,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});


// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login success",
      user: {
        _id: user._id,
        uname: user.uname,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// reset password by email
app.post("/api/auth/forget", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email not found" });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Forget password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// GET all activities
app.get("/api/activities", async (req, res) => {
  try {
    const activities = await ActivityModel.find();
    res.json(activities);
  } catch (err) {
    console.error("Get activities error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET one activity by id 
app.get("/api/activities/:id", async (req, res) => {
  try {
    const act = await ActivityModel.findById(req.params.id);
    if (!act) return res.status(404).json({ message: "Activity not found" });
    res.json(act);
  } catch (err) {
    console.error("Get activity error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/activities", async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      description,
      ageRange,
      durationDays,
      price,
      eventDate,
      imageUrl,
    } = req.body;

    const slugExists = await ActivityModel.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ message: "Slug already used" });
    }

    const activity = await ActivityModel.create({
      title,
      slug,
      category,
      description,
      ageRange,
      durationDays,
      price,
      eventDate,
      imageUrl,
    });

    res.status(201).json(activity);
  } catch (err) {
    console.error("Create activity error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update activity
app.put("/api/activities/:id", async (req, res) => {
  try {
    const updated = await ActivityModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Activity not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update activity error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE activity
app.delete("/api/activities/:id", async (req, res) => {
  try {
    const deleted = await ActivityModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Activity not found" });
    res.json({ message: "Activity deleted" });
  } catch (err) {
    console.error("Delete activity error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/bookings", async (req, res) => {
  try {
    const { userId, activityId, seats } = req.body;

    const activity = await ActivityModel.findById(activityId);
    if (!activity) {
      return res.status(400).json({ message: "Activity not found" });
    }

    const seatsNum = Number(seats) || 1;
    if (seatsNum <= 0) {
      return res.status(400).json({ message: "Invalid seats" });
    }

    const pricePerSeat = activity.price;
    const addAmount = seatsNum * pricePerSeat;

    let booking = await BookingModel.findOne({
      userId,
      activityId,
      status: "confirmed",
    });

    if (booking) {
      booking.seats += seatsNum;
      booking.totalPrice += addAmount;
      await booking.save();
    } else {
      booking = await BookingModel.create({
        userId,
        activityId,
        seats: seatsNum,
        totalPrice: addAmount,
        status: "confirmed",
      });
    }

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// GET bookings for one user
app.get("/api/bookings/user/:userId", async (req, res) => {
  try {
    const bookings = await BookingModel.find({
      userId: req.params.userId,
    }).populate("activityId");
    res.json(bookings);
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// PUT update booking seats
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { seats } = req.body;
    const seatsNum = Number(seats);

    if (!seatsNum || seatsNum <= 0) {
      return res.status(400).json({ message: "Seats must be at least 1" });
    }

    const booking = await BookingModel.findById(req.params.id).populate(
      "activityId"
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const pricePerSeat = booking.activityId.price || 0;

    booking.seats = seatsNum;
    booking.totalPrice = seatsNum * pricePerSeat;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error("Update booking error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});


// DELETE booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deleted = await BookingModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

app.get("/api/location", (req, res) => {
  res.json({
    name: "ActiClub Center – Boushar, Muscat",
    lat: 23.5479,
    lng: 58.403,
    googleMapsUrl:
      "https://www.google.com/maps/place/Bawshar,+Muscat,+Oman/",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
