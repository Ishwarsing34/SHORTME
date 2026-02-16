import dns from "dns";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
  "1.1.1.1"
]);

import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import urlRouter from "./routes/urlRoutes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/", urlRouter);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
