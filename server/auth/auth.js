import "dotenv/config";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errores.utils.js";

export function verificarTokenAuth(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw new ApiError(error.message, 500, "No se pudo verificar el token");
  }
}

export function generarToken(objeto, duracion) {
  try {
    return jwt.sign(objeto, process.env.SECRET_KEY, { expiresIn: duracion });
  } catch (error) {
    throw new ApiError(error.message, 500, "Error al crear el token");
  }
}

export function objetoSesion() {
  return {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60,
  };
}
