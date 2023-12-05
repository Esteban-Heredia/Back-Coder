import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
    if (req.session.counter) {
      req.session.counter++;
    } else {
      req.session.counter = 1;
    }
    res.render("log");
  });

router.post("/", passport.authenticate("login"), (req, res) => {
  if (!req.user) {
    console.log("no entro");
    return res
      .redirect(400)
      .send("/failRegistro", { status: "error", error: "invalid credentials" });
  }
  delete req.user.contrasena;
  req.session.user = req.user;
  console.log("entro en el 3", req.session.user);
  res.send({ status: "success", payload: req.user });
});

export default router;
