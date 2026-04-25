import { guardarEjercicio } from "../services/ejercicios.service.js";

export const registrarEjercicio = (req, res, next) => {
  try {
    console.log(req);
    const { data } = req.body;
    guardarEjercicio(data);
  } catch (error) {
    next(error);
  }
};
