import { Router } from "express";
import {
  verAlumno,
  registrarAlumno,
  verAlumnos,
  modificarAlumno,
  eliminarAlumno,
  verAlumnosGrupo,
} from "../controllers/alumno.controller.js";

const router = Router();

router.get("/verAlumno/:id", verAlumno);
router.get("/verAlumnosGrupo/:id", verAlumnosGrupo);
router.get("/verAlumnos", verAlumnos);
router.post("/registrarseAlumno", registrarAlumno);
router.put("/actualizarAlumno/:id", modificarAlumno);
router.delete("/eliminarAlumno/:id", eliminarAlumno);

export default router;
