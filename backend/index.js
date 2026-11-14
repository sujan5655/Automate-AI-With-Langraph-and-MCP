import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import agentRouter from "./routes/agent.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running successfully",
  });
});

// Auth routes
app.use("/api/auth", authRouter);
app.use("/api/agent", agentRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(500).json({
    message: "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
