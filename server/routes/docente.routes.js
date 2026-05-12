import { Router } from "express";
import {
  cambiarHabilitado,
  checarContraseña,
  consultarDocenteInfo,
  consultarDocentesInfo,
  editarDocenteInfo,
  eliminarDocente,
  registarDocente,
  reenviarVerificacion,
  verificarCorreoDocente,
} from "../controllers/docente.controller.js";

const router = Router();

router.post("/registrarDocente", registarDocente);
router.post("/reenviarVerificacion/:id", reenviarVerificacion);
router.get("/verificar", verificarCorreoDocente);
router.get("/verDocentes", consultarDocentesInfo);
router.get("/verDocente/:id", consultarDocenteInfo);
router.delete("/eliminarDocente/:id", eliminarDocente);
router.put("/editarDocente/:id", editarDocenteInfo);
router.put("/cambiarHabilitado/:id", cambiarHabilitado);
router.put("/verificarContra/:id", checarContraseña);

export default router;