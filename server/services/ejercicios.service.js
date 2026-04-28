import { crearEjercicio } from "../repo/ejercicios.repo.js";
import { controlErrores } from "../utils/utilidad.utils.js";

export const guardarEjercicio = async (data, docente) => {
  try {
    const json = JSON.parse(data);
    console.log(json);
    await crearEjercicio(json, docente);
  } catch (error) {
    controlErrores(error);
  }
};
