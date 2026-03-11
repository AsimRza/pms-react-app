import express from "express";

const router = express.Router();

const user = {
  firstName: "Sənan",
  lastName: "Məhərrəmov",
  email: "user@gmail.com",
  type: "Müəllim",
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "user@gmail.com" && password === "123456") {
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken: "mock_auth_token_123456",
        refreshToken: "mock_refresh_token_123456",
        user: user,
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
    res.status(200).json(user);
  }, 2000);
});

export default router;
