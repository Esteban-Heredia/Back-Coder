import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
  console.log('ayuda loginGit');
  res.send('algooo final');
});

router.get('/githubCallback', passport.authenticate('github'), (req, res) => {
  console.log('ayuda loginGit 2');
  const githubToken = req.user.githubToken;
  res.cookie("githubToken", githubToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.json({ status: "success", payload: { githubToken } });
});

export default router;
