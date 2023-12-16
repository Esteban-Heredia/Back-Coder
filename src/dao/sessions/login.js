import { Router } from "express";
import passport from "passport";
import { ensureNotAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", ensureNotAuthenticated, (req, res) => {
  res.render("log");
});

router.post("/", passport.authenticate("login"), (req, res) => {
  if (!req.user) {
    console.log("no entro");
    return res.status(400).send({ status: "error", error: "invalid credentials" });
  }
  delete req.user.password;
  req.session.user = req.user;
  console.log(req.user, 'algooo');
  res.send({ status: "success", payload: req.user });
});

export default router;
