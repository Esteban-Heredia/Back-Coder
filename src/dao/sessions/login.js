import { Router } from "express";
import passport from "passport";
import { ensureNotAuthenticated } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", ensureNotAuthenticated, (req, res) => {
  res.render("log");
});

router.post("/", passport.authenticate("login"), (req, res) => {
  if (!req.user) {
    console.log("Credenciales inválidas");
    return res.status(401).json({ status: "error", error: "Credenciales inválidas" });
  }

  const token = req.user.token;

  res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.json({ status: "success", payload: { user: req.user.user, token } });
});

export default router;
