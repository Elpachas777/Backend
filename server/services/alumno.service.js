import {
  consultarAlumnoPorId,
  consultarAlumnos,
  crearAlumno,
  crearAlumnoGrupo,
  eliminarAlumnoId,
  modificarInfoAlumno,
  verAlumnosGrupoId,
} from "../repo/alumno.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  alumnoId,
  controlErrores,
  validarCampos,
} from "../utils/utilidad.utils.js";

export const registrarNuevoAlumno = async (id, data) => {
  try {
    const datos = validarCampos(data, ["nombre", "apellidos"]);
    
    const nuevoAlumno = await crearAlumno(id, datos);

    if (!nuevoAlumno) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo registrar al alumno",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const registrarConGrupo = async (data) => {
  try {
    const datos = validarCampos(data, ["idGrupo", "nombre", "apellidos"]);
    const nuevoAlumno = await crearAlumnoGrupo(datos);

    if (!nuevoAlumno) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo registrar al alumno",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const verInfoAlumno = async (data) => {
  try {
    const alumno = await consultarAlumnoPorId(data);

    if (!alumno) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontró al alumno",
      );
    }

    const alumnoInfo = {
      nombre: alumno.usuario.nombres,
      apellidos: alumno.usuario.apellido,
    };

    return alumnoInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const verInfoAlumnos = async (id) => {
  try {
    const alumnos = await consultarAlumnos(id);

    if (!alumnos) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontró a ningun alumno",
      );
    }

    const alumnosInfo = alumnos.map((datos) => ({
      id: datos.id_alumno,
      nombres: datos.usuario.nombres,
      apellidos: datos.usuario.apellido,
    }));

    return alumnosInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const editarInfoAlumno = async (data) => {
  try {
    const alumnoModificado = await modificarInfoAlumno(data);

    if (!alumnoModificado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontró a ningun alumno para modificar",
      );
    }

    return alumnoModificado;
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminarAlumnoPorId = async (data) => {
  try {
    await alumnoId(data.id);

    const alumnoEliminado = await eliminarAlumnoId(data.id);

    if (!alumnoEliminado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontró a ningun alumno para eliminar",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const verAlumnosEnGrupo = async (data) => {
  try {
    const alumnos = await verAlumnosGrupoId(data);

    if (!alumnos) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontró a ningun alumno",
      );
    }

    const alumnosInfo = alumnos.map((datos) => ({
      id: datos.id_alumno,
      nombres: datos.usuario.nombres,
      apellidos: datos.usuario.apellido,
    }));

    return alumnosInfo;
  } catch (error) {
    controlErrores(error);
  }
};
