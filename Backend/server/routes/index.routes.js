import { Router } from "express";
import sendEmail from "../mail.js";

const router = Router();

router.get("/", (req, res) => {
  sendEmail();
});

export default router;
