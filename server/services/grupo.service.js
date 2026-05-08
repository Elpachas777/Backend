import { consultarDocentePorId } from "../repo/docente.repo.js";
import {
  agregar,
  consultarGrupoPorNombre,
  consultarGrupos,
  crearGrupo,
  editarGrupo,
  eliminarGrupoPorId,
} from "../repo/grupo.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  grupoId,
  peticionVacia,
} from "../utils/utilidad.utils.js";

export const crearGrupoNuevo = async (data) => {
  try {
    if (!consultarDocentePorId(data.id)) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        400,
        "No se encontró el docente titular del grupo",
      );
    }

    const nuevoGrupo = await crearGrupo(data);

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
    const grupoInfo = await consultarGrupoPorNombre(data.nombre);

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
    const grupos = await consultarGrupos(id);

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
      alumnos: datos.alumnos,
    }));

    return gruposInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const editarInfoGrupo = async (data) => {
  try {
    grupoId(data.id);
    const grupoEditado = await editarGrupo(data);

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
    const grupoEliminado = await eliminarGrupoPorId(id);

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
    const datos = data.map(Number);
    const agregado = await agregar(id, datos);
    peticionVacia(agregado);
  } catch (error) {
    controlErrores(error);
  }
};
