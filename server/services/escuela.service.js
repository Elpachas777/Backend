import { consultarEscuelas } from "../repo/escuela.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import { controlErrores } from "../utils/utilidad.utils.js";

export const verInfoEscuelas = async () => {
  try {
    const respuesta = await consultarEscuelas();

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
      contacto2: escuela.contacto_adicional,
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
