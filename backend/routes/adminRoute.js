import express from "express";
import jwt from "jsonwebtoken";

const adminRouter = express.Router();

adminRouter.post("/login", (req, res) => {
    try {
  const { email, password } = req.body;
  if (email === "kibetjoash90@gmail.com" && password === "joash1234") {
    const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });
    res.json({success: true, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
} catch (error) {
  res.status(500).json({ message: "Server error" });
}
});

export default adminRouter;