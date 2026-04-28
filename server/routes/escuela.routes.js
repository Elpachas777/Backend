import { Router } from "express"
import { verEscuelas } from "../controllers/escuela.controller.js"

const router = Router()

router.use("/verEscuelas", verEscuelas)

export default router