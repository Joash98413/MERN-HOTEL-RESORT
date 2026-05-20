import express from "express";
import cors from "cors";
import "dotenv/config";
console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import hotelRouter from "./routes/hotelRoute.js";

const app = express();

const PORT = process.env.PORT || 5000;


connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

app.use("/api/hotel", hotelRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});