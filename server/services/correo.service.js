import { generarToken, verificarTokenAuth } from "../auth/auth.js";
import { ApiError } from "../utils/errores.utils.js";
import enviarCorreo from "../utils/mail.utils.js";
import sendEmail from "../utils/mail.utils.js";
import { controlErrores } from "../utils/utilidad.utils.js";
import "dotenv/config";

export async function enviarTokenCorreo({ idDocente, correo, usuario }) {
  try {
    const objeto = { id: idDocente, correo: correo, tipo: "verificación" };
    const tokenVerificacion = generarToken(objeto, "1h");

    const pagina = `${process.env.URL_BACK_END}/verificar?token=${tokenVerificacion}`;

    await enviarCorreo(
      correo,
      "Confirmación de correo",
      ` <h1>Hola, ${usuario.nombres}</h1>
          <p>Gracias por registrarte. Haz clic para confirmar tu correo:</p>
          <p><a href="${pagina}">Confirmar correo</a></p>`,
    );

  } catch (error) {
    controlErrores(error)
  }
}

export const enviarCorreoContraseña = async (admin, token) => {
  try {
    const pagina = `${process.env.URL_FRONT_END}/RecuperarContraseña?token=${token}`;

    await enviarCorreo(
      admin.correo,
      "Recuperación de contraseña",
      `<h1>Recuperación de contraseña</h1>
            <p>Haz clic en el enlace para restablecer tu contraseña:</p>
            <p><a href="${pagina}">Recuperar contraseña</a></p>`,
    );
  } catch (error) {
    controlErrores(error)
  }
};

export function validarTokenCorreo({ token }) {
  try {
    const datosToken = verificarTokenAuth(token);

    if (datosToken.tipo !== "verificación")
      throw new ApiError(
        "No se pudo verificar el token",
        400,
        "Token invalido",
      );

    return datosToken;
  } catch (error) {
    controlErrores(error);
  }
}
