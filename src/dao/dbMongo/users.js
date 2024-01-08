import { Router } from "express";
import { userModel } from "../models/user.js";
import { cartModel } from "../models/cart.js";
import { createHash } from "../../utils.js";
import { ensureRole, verifyAMD } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await userModel.paginate({}, options);
    const parsedDocs = result.docs.map((doc) => doc.toObject());

    res.render("user", {
      docs: parsedDocs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
    });
  } catch (error) {
    console.log("Error en la operación GET de usuarios en MongoDB:", error);
    res.status(500).send({ status: "error", error: "Error en el servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    let { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Datos incompletos" });

    let result = await userModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
    });

    const nuevoCarrito = await cartModel.create({ products: [] });

    await userModel.findByIdAndUpdate(result._id, { cart: nuevoCarrito._id });

    res.send({ status: "El usuario se creo correctamente", payload: result });
  } catch (error) {
    console.log("Error en la operación POST de usuarios en MongoDB:", error);
    res.status(500).send({ status: "error", error: "Error en el servidor" });
  }
});

router.put("/:uid", verifyAMD, async (req, res) => {
  let { uid } = req.params;
  let userToReplace = req.body;
  if (
    !userToReplace.first_name ||
    !userToReplace.last_name ||
    !userToReplace.email
  )
    return res.send({ status: "error", error: "Datos incompletos" });

  let result = await userModel.updateOne({ _id: uid }, userToReplace);
  res.send({ status: "se actualizo el usuario", payload: result });
});

router.delete("/:uid", verifyAMD, async (req, res) => {
  let { uid } = req.params;
  let result = await userModel.deleteOne({ _id: uid });
  res.send({ status: "se borro correctamente", payload: result });
});
export default router;
