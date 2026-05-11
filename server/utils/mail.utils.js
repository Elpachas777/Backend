import "dotenv/config";
import { Resend } from "resend";
import { ApiError } from "./errores.utils.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function enviarCorreo(destinatario, asunto, cuerpo) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Silabando <noreply@silabando.com>",
      to: destinatario,
      subject: asunto,
      html: cuerpo,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new ApiError(
      error.message,
      500,
      "Error al enviar o construir el correo",
    );
  }
}
