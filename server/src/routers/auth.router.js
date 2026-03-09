import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "senan@gmail.com" && password === "123456") {
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken: "mock_auth_token_123456",
        refreshToken: "mock_refresh_token_123456",
        user: {
          name: "Sənan Meherremov",
          email: email || "test@example.com",
        },
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

export default router;
