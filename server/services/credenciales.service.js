import "dotenv/config";
import { verificarTokenAuth } from "../auth/auth.js";
import { ApiError } from "../utils/errores.utils.js";

export const verificarToken = (token) => {
  try {
    if (!token) {
      throw new ApiError(
        "No se encontró el token en las cookies",
        401,
        "Token inexistente",
      );
    }
    const tokenDatos = verificarTokenAuth(token);
    return tokenDatos;
  } catch (error) {
    throw new ApiError(error.message, 500, "Error al verificar el token");
  }
};
