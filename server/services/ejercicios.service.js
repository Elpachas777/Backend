import * as repo from "../repo/ejercicios.repo.js";
import { controlErrores, peticionVacia } from "../utils/utilidad.utils.js";

export const guardarEjercicio = async (data, id) => {
  try {
    const json = JSON.parse(data);
    await repo.crearEjercicio(json, id);
  } catch (error) {
    controlErrores(error);
  }
};

export const actualizar = async (id, data) => {
  try {
    const json = JSON.parse(data);
    const actualizado = await repo.actualizar(id, json);
    peticionVacia(actualizado, "No se puedo actualizar el ejercicio");
  } catch (error) {
    controlErrores(error);
  }
};

export const listarTipos = async () => {
  try {
    const tipos = await repo.listarTipos();
    peticionVacia(tipos, "No se pudieron obtener los tipos de ejercicios");
    return tipos;
  } catch (error) {
    controlErrores(error);
  }
};

export const listar = async (id) => {
  try {
    const ejercicios = await repo.listar(id);
    peticionVacia(ejercicios, "No se pudieron obtener los ejercicios");
    return ejercicios;
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminar = async (id) => {
  try {
    const eliminar = await repo.eliminar(id);
    peticionVacia(eliminar, "No se pudo eliminar el ejercicio");
  } catch (error) {
    controlErrores(error);
  }
};

export const asignar = async (id, data) => {
  try {
    const asignado = await repo.asignar(id, data.id)
    peticionVacia(asignado, "No se pudo asignar el ejercicio al grupo")
  } catch (error) {
    controlErrores(error)
  }
}