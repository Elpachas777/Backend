import { Router } from "express";
import {
  actualizar,
  crear,
  eliminar,
  listar,
} from "../controllers/escuela.controller.js";

const router = Router();

router.post("/registrarEscuela", crear);
router.get("/verEscuelas", listar);
router.put("/actualizarEscuela/:id", actualizar);
router.delete("/eliminarEscuela/:id", eliminar);

export default router;
