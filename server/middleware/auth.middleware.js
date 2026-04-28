import { verificarTokenAuth } from "../auth/auth.js";
import { ApiError } from "../utils/errores.utils.js";

export function auth(req, res, next) {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      next(
        new ApiError(
          "No existe el token en las cookies",
          401,
          "Token inexistente",
        ),
      );
      return;
    }

    const tokenDatos = verificarTokenAuth(token);
    req.user = tokenDatos;
    next();
  } catch (error) {
    next(new ApiError(error.message, 500, "Ocurrió un error interno"));
  }
}
