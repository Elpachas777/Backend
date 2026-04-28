import { Router } from "express"
import { verEscuelas } from "../controllers/escuela.controller.js"

const router = Router()

router.get("/verEscuelas", verEscuelas)

export default router