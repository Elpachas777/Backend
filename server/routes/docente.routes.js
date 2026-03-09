import { Router } from "express";
import {
  editarDocenteInfo,
  eliminarDocente,
  registarDocente,
  consultarDocenteInfo,
  consultarDocentesInfo,
  verificarCorreoDocente,
} from "../controllers/docente.controller.js";

const router = Router();

router.post("/registrarDocente", registarDocente);
router.get("/verificar", verificarCorreoDocente);
router.get("/verDocentes", consultarDocentesInfo);
router.get("/verDocente/:id", consultarDocenteInfo);
router.delete("/eliminarDocente/:id", eliminarDocente);
router.put("/editarDocente/:id", editarDocenteInfo);

export default router;
