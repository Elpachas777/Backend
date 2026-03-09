import { Router } from "express";
import { obtenerCredencial } from "../controllers/credenciales.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/autentificado", auth, (req, res) => {
  res.status(200).send(req.user);
});

router.get("/credenciales", obtenerCredencial);

export default router;
