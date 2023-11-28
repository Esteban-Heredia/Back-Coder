import { Router } from "express";
import { userModel } from "../models/user.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("log");
});

router.post('/', async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        if (!email || !contrasena) return res.status(400).send({ status: 'error', error: 'Datos incompletos' });

        const user = await userModel.findOne({ email, contrasena });

        if (user) {
            res.send({ status: 'Inicio de sesión exitoso', payload: user });
        } else {
            res.status(401).send({ status: 'error', error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        res.status(500).send({ status: 'error', error: 'Error en el servidor' });
    }
});

export default router;
