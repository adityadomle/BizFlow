import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import newsletterRoutes from "./routes/newsletter.js";

// ✅ Connect to DB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});
app.use("/api/newsletter", newsletterRoutes);

// Generic error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`JWT expires in: ${JWT_EXPIRES_IN}`);
});
