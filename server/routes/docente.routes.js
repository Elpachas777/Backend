import { Router } from "express";
import {
  cambiarHabilitado,
  consultarDocenteInfo,
  consultarDocentesInfo,
  editarDocenteInfo,
  eliminarDocente,
  registarDocente,
  verificarCorreoDocente,
} from "../controllers/docente.controller.js";

const router = Router();

router.post("/registrarDocente", registarDocente);
router.get("/verificar", verificarCorreoDocente);
router.get("/verDocentes", consultarDocentesInfo);
router.get("/verDocente/:id", consultarDocenteInfo);
router.delete("/eliminarDocente/:id", eliminarDocente);
router.put("/editarDocente/:id", editarDocenteInfo);
router.put("/cambiarHabilitado/:id", cambiarHabilitado);

export default router;
