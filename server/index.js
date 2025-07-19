import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

// ✅ Razorpay instance configuration
export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true,
}));

const port = process.env.PORT;

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// ✅ Static file route
app.use("/uploads", express.static("uploads"));

// ✅ Import routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

// ✅ Use routes
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", courseRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});