import { Router } from "express";
import {
  registrarEjercicio,
  verEjercicio,
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.post("/crearEjercicio", registrarEjercicio);
router.get("/verEjercicio", verEjercicio);

export default router;
