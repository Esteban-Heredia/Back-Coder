import { Router } from "express";
import { productModel } from "../../models/product.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('newProducts')
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productModel.findById(id).lean();

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.render("newProducts", { producto });
    } catch (error) {
        console.error("Error al obtener un producto por ID:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});


export default router;