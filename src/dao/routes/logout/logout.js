import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }
    
    res.clearCookie("connect.sid");

    res.clearCookie("jwt");

    res.redirect("/");
  });
});

export default router;
