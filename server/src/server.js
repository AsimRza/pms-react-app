import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRouter from "./routers/auth.router.js";

import studentRouter from "./routers/students.router.js";
import lessonsRouter from "./routers/lessons.router.js";
import userRouter from "./routers//user.router.js";
import statisticsRouter from "./routers/statistics.router.js";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://pms-react-app-5yvu.vercel.app",
    ],
    credentials: true,
    exposedHeaders: ["X-Total-Count", "X-Page", "X-Limit", "X-Has-Next-Page"],
  }),
);

app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
