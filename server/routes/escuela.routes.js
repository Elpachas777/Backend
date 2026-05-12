import { Router } from "express";
import {
  actualizar,
  listar,
  listarTipos,
  registrarEjercicio,
  eliminar,
  asignar
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.post("/crearEjercicio", registrarEjercicio);
router.get("/obtenerTipos", listarTipos);
router.get("/obtenerEjercicios", listar);
router.get("/estadisticasAsignacion/:id", estadisticasAsignacion);
router.put("/editarEjercicio/:id", actualizar);
router.delete("/eliminarEjercicio/:id", eliminar);
router.put("/asignar/:id", asignar)

export default router;