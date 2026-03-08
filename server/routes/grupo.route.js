import { Router } from "express";
import {
  registrarGrupo,
  verGrupo,
  verGrupos,
  eliminarGrupo,
  modificarGrupo,
  agregarAlumno,
} from "../controllers/grupo.controller.js";

import { auth } from "../auth/auth.js";

const router = Router();

router.post("/verGrupo", verGrupo);
router.get("/verGrupos", verGrupos);
router.post("/registrarseGrupo", auth, registrarGrupo);
router.put("/actualizarGrupo/:id", modificarGrupo);
router.delete("/eliminarGrupo/:id", eliminarGrupo);
router.put("/agregarAlumno", agregarAlumno);

export default router;
