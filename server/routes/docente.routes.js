import { Router } from "express";
import multer from "multer";
import {
  cambiarHabilitado,
  checarContraseña,
  consultarDocenteInfo,
  consultarDocentesInfo,
  editarDocenteInfo,
  eliminarDocente,
  reenviarVerificacion,
  registarDocente,
  verificarCorreoDocente,
} from "../controllers/docente.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/registrarDocente", upload.single("foto"), registarDocente);
router.post("/reenviarVerificacion/:id", reenviarVerificacion);
router.get("/verificar", verificarCorreoDocente);
router.get("/verDocentes", consultarDocentesInfo);
router.get("/verDocente/:id", consultarDocenteInfo);
router.delete("/eliminarDocente/:id", eliminarDocente);
router.put("/editarDocente/:id", upload.single("foto"), editarDocenteInfo);
router.put("/cambiarHabilitado/:id", cambiarHabilitado);
router.put("/verificarContra/:id", checarContraseña);

export default router;
