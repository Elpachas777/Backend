import * as service from "../services/admin.service.js";
import { verificarToken } from "../services/credenciales.service.js";

export async function registrarAdmin(req, res, next) {
  try {
    await service.registrarNuevoAdministrador(req.body);

    return res.status(201).json({
      tipo: "success",
      mensaje: "Administrador registrado con éxito",
    });
  } catch (error) {
    next(error);
  }
}

export async function verificar(req, res, next) {
  try {
    const token = req.cookies?.access_token || "";
    const { id, rol } = verificarToken(token);
    const { contraseña } = req.body;

    await service.verificar(id, rol, contraseña);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Las contraseñas coinciden",
    });
  } catch (error) {
    next(error);
  }
}
