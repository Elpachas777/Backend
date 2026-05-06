import { Router } from "express";
import {
  actualizar,
  listar,
  listarTipos,
  registrarEjercicio,
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.post("/crearEjercicio", registrarEjercicio);
router.get("/obtenerTipos", listarTipos);
router.get("/obtenerEjercicios", listar);
router.put("/editarEjercicio/:id", actualizar);
router.delete("/eliminarEjercicio/:id", eliminiar);

export default router;
