import { Router } from "express";
import {
  agregarAlumnoAGrupo,
  consultarGrupoInfo,
  consultarGruposInfo,
  editarGrupoInfo,
  eliminarGrupo,
  registrarGrupo,
} from "../controllers/grupo.controller.js";

import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/verGrupo", consultarGrupoInfo);
router.get("/verGrupos", consultarGruposInfo);
router.post("/registrarseGrupo", auth, registrarGrupo);
router.put("/actualizarGrupo/:id", editarGrupoInfo);
router.delete("/eliminarGrupo/:id", eliminarGrupo);
router.put("/agregarAlumno", agregarAlumnoAGrupo);

export default router;
