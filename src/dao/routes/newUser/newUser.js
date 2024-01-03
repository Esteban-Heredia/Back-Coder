import { Router } from "express";
import { userModel } from "../../models/user.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('newUser')
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).lean();

        if (!user) {
            return res.status(404).json({ error: "user no encontrado" });
        }

        console.log(user,'el usuarioooo')
        res.render("newUser", { user });
    } catch (error) {
        console.error("Error al obtener un user por ID:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});


export default router;