import { guardarEjercicio } from "../services/ejercicios.service.js";

export const registrarEjercicio = (req, res, next) => {
  try {
    console.log("hOLA");
    console.log(req.body);
    const { data } = req.body;
    guardarEjercicio(data);
    return "Hola";
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
