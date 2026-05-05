import { Router } from "express";
import {
  listarTipos,
  registrarEjercicio,
  verEjercicio,
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.post("/crearEjercicio", registrarEjercicio);
router.get("/obtenerTipos", listarTipos);
router.get("/verEjercicio", verEjercicio);

export default router;
