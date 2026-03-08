import { Router } from "express";
import {
  cerrarSesion,
  correoContraseña,
  iniciarSesionDocente,
  recuperarContraseña,
} from "../controllers/sesion.controller.js";

const router = Router();

router.post("/iniciarSesion", iniciarSesionDocente);
router.post("/recuperar", correoContraseña);
router.post("/recuperarContra", recuperarContraseña);
router.get("/cerrar", cerrarSesion);

export default router;
