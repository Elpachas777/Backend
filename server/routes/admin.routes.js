import { Router } from "express";
import { registrarAdmin, verificar } from "../controllers/admin.controller.js";

const router = Router();

router.post("/crearAdmin", registrarAdmin);
router.post("/verificarPassword", verificar);

export default router;
