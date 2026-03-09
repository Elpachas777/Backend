import { Router } from "express";
import sendEmail from "../utils/mail.utils.js";

const router = Router();

router.get("/", (req, res) => {
  sendEmail();
});

export default router;
