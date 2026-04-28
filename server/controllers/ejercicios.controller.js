import { verificarTokenAuth } from "../auth/auth.js";
import { guardarEjercicio } from "../services/ejercicios.service.js";

export const registrarEjercicio = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req.cookies?.access_token || "";
    const docente = verificarTokenAuth(token)

    console.log(docente)

    await guardarEjercicio(JSON.stringify(data), docente.id);

    return res.status(200).json({
      tipo: "success",
      mensaje: "Ejercicio guardado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const verEjercicio = (req, res, next) => {
  try {
    console.log("Hola");
    return "Hola";
  } catch (error) {
    next(error);
  }
};
