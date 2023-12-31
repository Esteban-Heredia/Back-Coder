import express from "express";
import { cartModel } from "../../dao/models/cart.js";
import { productModel } from "../models/product.js";
import { verifyAMD } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartModel.create({ products: [] });
    res.send({ status: "Carrito creado", payload: nuevoCarrito });
  } catch (error) {
    console.error("Error al crear un carrito:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.post("/:cartId/products/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const carrito = await cartModel.findById(cartId);
    const producto = await productModel.findById(productId);

    if (!carrito || !producto) {
      return res
        .status(404)
        .send({ error: "Carrito o producto no encontrado" });
    }

    const existingProduct = carrito.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      carrito.products.push({ product: producto._id, quantity: 1 });
    }

    await carrito.save();

    res.send({ status: "agregado al carrito", payload: carrito });
  } catch (error) {
    console.error("Error al agregar un producto al carrito:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.get("/", verifyAMD, async (req, res) => {
  try {
    const carritos = await cartModel.find().lean();
    res.render("carts", { carritos });
  } catch (error) {
    console.error("Error al obtener todos los carritos:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    const carrito = await cartModel
      .findById(cartId)
      .populate("products")
      .lean();

    if (!carrito) {
      return res.status(404).send({ error: "Carrito no encontrado" });
    }

    const productosDetalles = await Promise.all(
      carrito.products.map(async (producto) => {
        const productDetails = await productModel.findById(producto.product).lean();
        return {
          name: productDetails.title,
          quantity: producto.quantity,
          price: productDetails.price,
          id: productDetails._id
        };
      })
    );

    res.render("carrito", {productosDetalles} );
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.put("/:cartId/products/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const carrito = await cartModel.findById(cartId);
    const productoEnCarrito = carrito.products.find(
      (item) => item.product.toString() === productId
    );

    if (!carrito || !productoEnCarrito) {
      return res
        .status(404)
        .send({ error: "Carrito o producto no encontrado" });
    }

    productoEnCarrito.quantity = quantity;
    await carrito.save();

    res.send({ status: "Cantidad del producto actualizada", payload: carrito });
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito:",
      error
    );
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.delete("/:cartId/products/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const carrito = await cartModel.findById(cartId);
    const productoIndex = carrito.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (!carrito || productoIndex === -1) {
      return res
        .status(404)
        .send({ error: "Carrito o producto no encontrado" });
    }

    carrito.products.splice(productoIndex, 1);
    await carrito.save();

    res.send({ status: "Producto eliminado del carrito", payload: carrito });
  } catch (error) {
    console.error("Error al eliminar un producto del carrito:", error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

export default router;
