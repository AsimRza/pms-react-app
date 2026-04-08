import express from "express";
import { D_USER } from "../data/auth.js";

const router = express.Router();

let hasOtherUserRegister = false;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "user@gmail.com" && password === "123456") {
    setTimeout(() => {
      hasOtherUserRegister = false;
      res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken: "mock_auth_token_123456",
        refreshToken: "mock_refresh_token_123456",
        user: D_USER,
      });
    }, 2000);
  } else if (email === "user1@gmail.com" && password === "123456") {
    hasOtherUserRegister = true;
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken: "mock_auth_token_nurlan",
        refreshToken: "mock_refresh_token_123456",
        user: { ...D_USER, firstName: "Nurlan", lastName: "Naibov" },
      });
    }, 2000);
  } else {
    setTimeout(() => {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }, 2000);
  }
});

router.post("/logout", (_, res) => {
  setTimeout(() => {
    res.sendStatus(201);
  }, 2000);
});

router.get("/me", (_, res) => {
  setTimeout(() => {
    if (hasOtherUserRegister) {
      res
        .status(200)
        .json({ ...D_USER, firstName: "Nurlan", lastName: "Naibov" });
    } else {
      res.status(200).json(D_USER);
    }
  }, 2000);
});

export default router;
