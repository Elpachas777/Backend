import { Router } from "express";
import { registrarEjercicio } from "../controllers/ejercicios.controller";

const router = Router();

router.post("/Ejercicio", registrarEjercicio);

export default router;
