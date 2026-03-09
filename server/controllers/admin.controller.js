import { registrarNuevoAdministrador } from "../services/admin.service.js";

export async function registrarAdmin(req, res, next) {
  try {
    console.log(req.body);
    await registrarNuevoAdministrador(req.body);

    return res.status(201).json({
      tipo: "success",
      mensaje: "Administrador registrado con éxito",
    });
  } catch (error) {
    next(error);
  }
}
