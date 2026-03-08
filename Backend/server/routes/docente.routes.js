import { Router } from "express";
import {
  editarDocente,
  eliminarDocente,
  registarDocente,
  verDocentes,
  verDocente,
  verificarDocente,
} from "../controllers/docente.controller.js";

const router = Router();

router.post("/registrarDocente", registarDocente);
router.get("/verificar", verificarDocente);
router.get("/verDocentes", verDocentes);
router.get("/verDocente/:id", verDocente);
router.delete("/eliminarDocente/:id", eliminarDocente);
router.put("/editarDocente/:id", editarDocente);

export default router;
