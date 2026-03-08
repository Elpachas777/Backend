import { Router } from "express";
import { auth } from "../auth/auth.js";
import { obtenerCredencial } from "../controllers/credenciales.controller.js";

const router = Router();

router.get("/autentificado", auth, (req, res) => {
  res.status(200).send(req.user);
});

router.get("/credenciales", obtenerCredencial);

export default router;
