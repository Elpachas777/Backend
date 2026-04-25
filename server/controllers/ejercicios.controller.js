import { guardarEjercicio } from "../services/ejercicios.service.js";

export const registrarEjercicio = (req, res, next) => {
  console.log(req);
  const { data } = req.body;
  guardarEjercicio(data);
};
