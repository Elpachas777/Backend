import * as repo from "../repo/ejercicios.repo.js";
import { controlErrores, peticionVacia } from "../utils/utilidad.utils.js";

export const guardarEjercicio = async (data, id) => {
  try {
    const json = JSON.parse(data);
    console.log(json);
    await repo.crearEjercicio(json, id);
  } catch (error) {
    controlErrores(error);
  }
};

export const listarTipos = async () => {
  try {
    const tipos = await repo.listarTipos();
    peticionVacia(tipos);
    return tipos;
  } catch (error) {
    controlErrores(error);
  }
};
