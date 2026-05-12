import { Router } from "express";
import {
  consultarAlumnoInfo,
  consultarAlumnosInfo,
  consultarEjerciciosAlumno,
  eliminarAlumno,
  modificarAlumno,
  registrarAlumno,
  verAlumnosGrupo,
} from "../controllers/alumno.controller.js";

const router = Router();

router.get("/verAlumno/:id", consultarAlumnoInfo);
router.get("/verAlumnosGrupo/:id", verAlumnosGrupo);
router.get("/verAlumnos", consultarAlumnosInfo);
router.get("/ejerciciosAlumno/:idAlumno", consultarEjerciciosAlumno);
router.post("/registrarseAlumno", registrarAlumno);
router.put("/actualizarAlumno/:id", modificarAlumno);
router.delete("/eliminarAlumno/:id", eliminarAlumno);

export default router;