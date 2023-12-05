import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
    res.render('register')
  });

  router.post("/", passport.authenticate('register') ,async (req, res) => {
    res.send({status:'success', message:'Usuario registrado'})
});


export default router;
