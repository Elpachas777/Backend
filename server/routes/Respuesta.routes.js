import { Router } from "express";
import {
  consultarResultadosAlumno,
  consultarResultadosAlumnoEjercicio,
  consultarSilabasDificiles,
  registrarIntento,
} from "../controllers/respuesta.controller.js";

const router = Router();

router.post("/respuesta", registrarIntento);
router.get("/resultadosAlumno/:idAlumno", consultarResultadosAlumno);
router.get(
  "/resultadosAlumno/:idAlumno/ejercicio/:idEjercicio",
  consultarResultadosAlumnoEjercicio,
);
router.get("/silabasDificiles/:idAlumno", consultarSilabasDificiles);

export default router;