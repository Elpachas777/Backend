import { verificarToken } from "../services/credenciales.service.js";

export async function obtenerCredencial(req, res, next) {
  try {
    const token = req.cookies?.access_token || "";
    const verificado = verificarToken(token);

    return res.status(200).json({ rol: verificado.rol });
  } catch (error) {
    next(error);
  }
}
