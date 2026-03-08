import { Router } from "express";
import { registrarAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.post("/crearAdmin", registrarAdmin);

export default router;
