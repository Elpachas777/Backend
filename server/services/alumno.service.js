import * as repo from "../repo/alumno.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  alumnoId,
  controlErrores,
  peticionVacia,
  validarCampos,
} from "../utils/utilidad.utils.js";

export const registrarNuevoAlumno = async (id, data) => {
  try {
    const datos = validarCampos(data, ["nombre", "apellidos"]);

    const nuevoAlumno = await repo.crearAlumno(id, datos);

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
    const nuevoAlumno = await repo.crearAlumnoGrupo(datos);

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
    const alumno = await repo.consultarAlumnoPorId(data);

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
    const alumnos = await repo.consultarAlumnos(id);

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
      grupo: datos.grupo?.nombre_grupo || "",
      id_ingreso : datos.id_ingreso || ""
    }));

    return alumnosInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const editarInfoAlumno = async (data) => {
  try {
    const alumnoModificado = await repo.modificarInfoAlumno(data);

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

    const alumnoEliminado = await repo.eliminarAlumnoId(data.id);

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
    const alumnos = await repo.verAlumnosGrupoId(data);

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

export const actualizarId = async (id, grupo, apellidos) => {
  try {
    
    let separados = apellidos.toUpperCase().split(" ")
    const inicio = separados[0].charAt(0) + separados[1].charAt(0) + grupo

    const totalIds = await repo.contarIds(inicio)
    const id_ingreso = inicio + (totalIds + 1)

    const actualizado = await repo.actualizarId(id, id_ingreso)
    peticionVacia(actualizado, "No se pudo generar el id de acceso para el alumno")

  } catch (error) {
    controlErrores(error)
  }
}