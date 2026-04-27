import { controlErrores } from "../utils/utilidad.utils.js";

export const guardarEjercicio = (data) => {
  try {
    const json = JSON.parse(data);
    console.log(json);
    //crearEjercicio(json);
  } catch (error) {
    controlErrores(error);
  }
};
