import { guardarEjercicio } from "../services/ejercicios.service";

export const registrarEjercicio = (req, res, next) => {
  const { data } = req.body;
  guardarEjercicio(data);
};
