import { consultarDocentePorId } from "../repo/docente.repo.js";
import * as repo from "../repo/grupo.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  grupoId,
  peticionVacia,
} from "../utils/utilidad.utils.js";

export const crearGrupoNuevo = async (data) => {
  try {
    if (! await consultarDocentePorId(data.id)) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        400,
        "No se encontró el docente titular del grupo",
      );
    }

    const nuevoGrupo = await repo.crearGrupo(data);

    if (!nuevoGrupo) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se puedo registrar el grupo",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const verInfoGrupo = async (data) => {
  try {
    const grupoInfo = await repo.consultarGrupoPorNombre(data.nombre);

    if (!grupoInfo) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        400,
        "No se encontró información sobre el grupo",
      );
    }

    return grupoInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const verInfoGrupos = async (id) => {
  try {
    const grupos = await repo.consultarGrupos(id);

    if (!grupos) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        400,
        "No se encontró ningun grupo registrado",
      );
    }

    const gruposInfo = grupos.map((datos) => ({
      id: datos.id_grupo,
      nombre: datos.nombre_grupo,
      turno: datos.turno,
    }));

    return gruposInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const listarAlumnos = async (id) => {
  try {
    const grupo = await repo.listarAlumnos(id)
    peticionVacia(grupo, "No se pudo consultar la información de los alumnos")
    
    const listaAlumnos = grupo.alumnos.map((alumno) => ({
      id: alumno.id_ingreso || "",
      nombre: alumno.usuario.nombres,
      apellidos: alumno.usuario.apellido
    }))

    return listaAlumnos;
  } catch (error) {
    controlErrores(error)
  }
}


export const editarInfoGrupo = async (data) => {
  try {
    grupoId(data.id);
    const grupoEditado = await repo.editarGrupo(data);

    if (!grupoEditado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        400,
        "No se pudo editar al grupo",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminarGrupoId = async (id) => {
  try {
    await grupoId(id);
    const grupoEliminado = await repo.eliminarGrupoPorId(id);

    if (!grupoEliminado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        400,
        "No se pudo editar al grupo",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const agregarAlumnoGrupo = async (id, data) => {
  try {
    const ids = data.map((alumno) => alumno.id);
    const datos = ids.map(Number);
    
    const agregado = await repo.agregar(id, datos);
    peticionVacia(agregado, "No se pudo agregar el alumno al grupo");
  } catch (error) {
    controlErrores(error);
  }
};