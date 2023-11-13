import { Router } from "express";
import { productModel } from "../models/product.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if(!title || !description || !price || !code || !stock) {
        return res.status(400).send({status:"error datos incompletos"});
    }

    const nuevoProducto = await productModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    res.send({status:'se creo el producto'});
  } catch (error) {
    console.error("Error al crear un producto:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.get('/', async (req, res)=>{
    try {
        const product = await productModel.find().lean();
        console.log(product)
        res.render('products' , {product})
    } catch (error) { 
        console.error('error al obtener los productos');
        res.status(500).send({error:'error en el servidor'})
    }
});

router.put('/:id', async (req,res)=> {
    try {
        const { id } = req.params;
        const { title, description, price, thumbnail, code, stock } = req.body;

        const productoActualizado = await productModel.updateOne({_id:id},{
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          } )

          if (!productoActualizado){
            return res.send({status:'error', error:'Datos incompletos'})
          }

          res.send(productoActualizado);
    } catch (error){
        console.error('error al actualizar el producto')
        res.status(500).send({error:'error en el servidor'})
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const productoEliminado = await productModel.findByIdAndRemove(id);
      
      if (!productoEliminado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar un producto por ID:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
  export default router;
