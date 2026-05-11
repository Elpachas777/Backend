import nodemailer from "nodemailer";
import "dotenv/config";
import { ApiError } from "./errores.utils.js";

export default async function enviarCorreo(destinatario, asunto, cuerpo) {
  try {
    const usuario = process.env.CORREO
    const conta = process.env.CONTRA

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: usuario,
        pass: conta,
      },
    });

    const mailoptions = {
      from: usuario,
      to: destinatario,
      subject: asunto,
      html: cuerpo,
    };

    const info = await transporter.sendMail(mailoptions);
    return info
  } catch (error) {
    throw new ApiError(
      error.message,
      500,
      "Error al enviar o construir el correo",
    );
  }
};

