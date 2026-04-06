import express from "express";
import { D_USER } from "../data/auth.js";

const router = express.Router();

router.get("/me", (req, res) => {
  setTimeout(() => {
    res.json(D_USER);
  }, 2000);
});

export default router;
