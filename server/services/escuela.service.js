import * as repo from "../repo/escuela.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  peticionVacia,
  quitarVacios,
} from "../utils/utilidad.utils.js";

export const crear = async (data) => {
  try {
    const escuela = await repo.crear(data);
    if (!escuela) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo registrar la escuela",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const actualizar = async (id, data) => {
  try {
    const actualizado = await repo.actualizar(id, quitarVacios(data));
    peticionVacia(actualizado, "No se pudo actualizar la escuela");
  } catch (error) {
    controlErrores(error);
  }
};

export const listar = async () => {
  try {
    const respuesta = await repo.listar();
    if (!respuesta) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No hay escuelas registradas",
      );
    }

    const escuelas = respuesta.map((escuela) => ({
      id: escuela.id_escuela,
      nombre: escuela.nombre,
      ubicacion: escuela.ubicacion,
      director: escuela.director,
      contacto: escuela.contacto,
      contacto_adicional: escuela.contacto_adicional,
      docentes: escuela.docentes.map((docente) => ({
        id: docente.id_docente,
        nombre: docente.usuario.nombres + " " + docente.usuario.apellido,
      })),
    }));

    return escuelas;
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminar = async (id) => {
  try {
    const eliminado = await repo.eliminar(id);
    peticionVacia(eliminado);
  } catch (error) {
    controlErrores(error);
  }
};
