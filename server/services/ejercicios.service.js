import { crearEjercicio } from "../repo/ejercicios.repo.js";
import { controlErrores } from "../utils/utilidad.utils.js";

export const guardarEjercicio = async (data, id) => {
  try {
    const json = JSON.parse(data);
    console.log(json);
    await crearEjercicio(json, id);
  } catch (error) {
    controlErrores(error);
  }
};
