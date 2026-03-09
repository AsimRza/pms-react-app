import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRouter from "./routers/auth.router.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
