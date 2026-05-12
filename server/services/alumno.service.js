import * as repo from "../repo/alumno.repo.js";
import * as respuestaRepo from "../repo/respuesta.repo.js";
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
      id_ingreso: datos.id_ingreso || ""
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

export const verEjerciciosDelAlumno = async ({ idAlumno }) => {
  try {
    if (!idAlumno) {
      throw new ApiError(
        "Falta el id de ingreso del alumno",
        400,
        "El id de acceso del alumno es obligatorio",
      );
    }

    const idLimpio = String(idAlumno).trim().toUpperCase();

    const alumno = await repo.consultarAlumnoConEjerciciosPorIdIngreso(idLimpio);

    if (!alumno) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        404,
        "No se encontró al alumno con el id de acceso proporcionado",
      );
    }

    let respuestasAlumno = [];

    try {
      respuestasAlumno = await respuestaRepo.listarRespuestasAlumno(
        alumno.id_alumno,
      );
    } catch (error) {
      console.log(
        "Error al consultar respuestas del alumno:",
        error.message,
      );

      respuestasAlumno = [];
    }

    const ejerciciosResueltos = new Set(
      respuestasAlumno.map((r) => Number(r.id_ejercicio)),
    );

    const ejercicios = (alumno.grupo?.ejercicios ?? [])
      .filter(
        (ejercicio) =>
          !ejerciciosResueltos.has(Number(ejercicio.id_ejercicio)),
      )
      .map((ejercicio) => ({
        id_ejercicio: ejercicio.id_ejercicio,
        titulo: ejercicio.titulo,
        fecha_inicio: ejercicio.fecha_inicio,
        fecha_final: ejercicio.fecha_final,
        id_tipo: ejercicio.id_tipo,
        tipo: ejercicio.tipo?.nombre || "",
        contenido: ejercicio.contenido,
      }));

    return {
      alumno: {
        id: alumno.id_alumno,
        id_ingreso: alumno.id_ingreso,
        nombre: alumno.usuario.nombres,
        apellidos: alumno.usuario.apellido,
      },
      grupo: alumno.grupo
        ? {
            id: alumno.grupo.id_grupo,
            nombre: alumno.grupo.nombre_grupo,
          }
        : null,
      ejercicios,
    };
  } catch (error) {
    controlErrores(error);
  }
};
export const actualizarId = async (id, grupo, apellidos) => {
  try {
    const apellidosSeparados = String(apellidos || "")
      .trim()
      .toUpperCase()
      .split(/\s+/)
      .filter(Boolean);

    const primerApellido = apellidosSeparados[0] || "X";
    const segundoApellido = apellidosSeparados[1] || primerApellido;

    const iniciales =
      primerApellido.charAt(0) +
      segundoApellido.charAt(0);

    const inicio = iniciales + grupo;

    const totalIds = await repo.contarIds(inicio);
    const id_ingreso = inicio + (totalIds + 1);

    const actualizado = await repo.actualizarId(id, id_ingreso);

    peticionVacia(
      actualizado,
      "No se pudo generar el id de acceso para el alumno",
    );
  } catch (error) {
    controlErrores(error);
  }
};