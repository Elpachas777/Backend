import { Router } from "express";
import { registrarEjercicio } from "../controllers/ejercicios.controller.js";

const router = Router();

router.post("/Ejercicio", registrarEjercicio);

export default router;
