import { Router } from "express";
import { userModel } from "../models/user.js";
import { createHash } from "../../utils.js";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
    res.render('register')
  });

  router.post("/", passport.authenticate('asd', {successRedirect:'/' ,failureRedirect: '/log' }) ,async (req, res) => {
    console.log('asdddadasda')
    res.send({status:'success', message:'Usuario registrado'})
  // try {
  //   let { nombre, apellido, email, contrasena } = req.body;
  //   if (!nombre || !apellido || !email || !contrasena)
  //     return res
  //       .status(400)
  //       .send({ status: "error", error: "Datos incompletos" });

  //   let result = await userModel.create({
  //     nombre,
  //     apellido,
  //     email,
  //     contrasena: createHash(contrasena),
  //   });

  //   res.send({status: 'El usuario se creo correctamente' , payload:result} );
  // } catch (error) {
  //   console.log("Error en la operación POST de usuarios en MongoDB:", error);
  //   res.status(500).send({ status: "error", error: "Error en el servidor" });
  // }
});

export default router;
