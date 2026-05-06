import { verificarToken } from "../services/credenciales.service.js";

export async function obtenerCredencial(req, res, next) {
  try {
    const token = req.cookies?.access_token || "";
    const verificado = verificarToken(token);

    const data = {
      nombre : verificado.nombre,
      rol : verificado.rol
    }
    
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
