import { verificarToken } from "../services/credenciales.service.js";

export async function obtenerCredencial(req, res, next) {
  try {
    console.log(req.cookies);
    const token = req.cookies?.access_token || "";
    const rol = verificarToken(token);

    return res.status(200).json({ rol: rol });
  } catch (error) {
    next(error);
  }
}
