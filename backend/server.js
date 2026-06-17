import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import hotelRouter from "./routes/hotelRoute.js";
console.log("Cloud Name loaded:", process.env.CLOUDINARY_NAME);
import reservationRoute from "./routes/reservationRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
const app = express();

const PORT = process.env.PORT || 5000;



app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5177', 'http://localhost:5178'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static("uploads"));

connectCloudinary();

// Attempt to connect to MongoDB asynchronously without blocking server startup
(async () => {
  try {
    await connectDB();
    console.log('Database connection established.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    console.warn('Server started without database connection. Some features may not work.');
  }
})();

app.use("/api/admin", adminRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/reservations", reservationRoute);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});