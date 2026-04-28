import { crearEjercicio } from "../repo/ejercicios.repo.js";
import { controlErrores } from "../utils/utilidad.utils.js";

export const guardarEjercicio = async (data, grupo) => {
  try {
    const json = JSON.parse(data);
    console.log(json);
    await crearEjercicio(json);
  } catch (error) {
    controlErrores(error);
  }
};
