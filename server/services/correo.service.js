import { verificarTokenAuth } from "../auth/auth.js";
import { ApiError } from "../utils/errores.utils.js";
import sendEmail from "../utils/mail.utils.js"
import { controlErrores } from "../utils/utilidad.utils.js";

export function enviarTokenCorreo({ idDocente, correo, nombres }) {
    try {
        const objeto = { id: idDocente, correo: correo, tipo: "verificación" }
        const tokenVerificacion = generarToken(objeto, "1h")

        const pagina = `http://localhost:4000/verificar?token=${tokenVerificacion}`;
        sendEmail(
            correo,
            "Confirmación de correo",
            ` <h1>Hola, ${nombres}</h1>
          <p>Gracias por registrarte. Haz clic para confirmar tu correo:</p>
          <p><a href="${pagina}">Confirmar correo</a></p>`
        );
    } catch (error) {
        throw new ApiError(error.message, 500, "Error al enviar el correo con el token de confirmación")
    }
}

export const enviarCorreoContraseña = (token) => {
    try {
        const pagina = `http://localhost:5173/RecuperarContraseña?token=${token}`;

        sendEmail(
            admin.correo,
            "Recuperación de contraseña",
            `<h1>Recuperación de contraseña</h1>
            <p>Haz clic en el enlace para restablecer tu contraseña:</p>
            <p><a href="${pagina}">Recuperar contraseña</a></p>`
        );
    } catch (error) {
        throw new ApiError(error.message, 500, "Error al enviar el correo para recuperar la constraseña")
    }

}

export function validarTokenCorreo(token) {
    try {
        const datosToken = verificarTokenAuth(token);

        if (datosToken.tipo !== "verificación")
            throw new ApiError("No se pudo verificar el token", 400, "Token invalido")

        return datosToken;
    } catch (error) {
        controlErrores(error)
    }
}
