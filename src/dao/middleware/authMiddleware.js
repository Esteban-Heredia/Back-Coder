import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";

const ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

const ensureRole = (requiredRole) => {
  return (req, res, next) => {
    if (
      req.isAuthenticated() &&
      req.session.user &&
      req.session.user.role === requiredRole
    ) {
      return next();
    }
    return res.status(403).send("no tenes el rol necesario");
  };
};

const verifyAMD = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const verified = await jwt.verify(token, process.env.SESSION_SECRET);
    const user = await userModel.findById(verified.userId);
  
    if (user.role === "admin") return next();
    return res.status(401).send("not authorized");
  } catch (error) {
    window.location.href = "/"
    throw new Error (error)
  }
};

export { ensureNotAuthenticated, ensureRole, verifyAMD };
