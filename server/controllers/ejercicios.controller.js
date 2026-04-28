import { guardarEjercicio } from "../services/ejercicios.service.js";

export const registrarEjercicio = async (req, res, next) => {
  try {
    const data = req.body;
    const docente = req.cookie?.access_token.id || "";
    console.log(docente)
    console.log(req.cookie)
    await guardarEjercicio(JSON.stringify(data), docente);

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
