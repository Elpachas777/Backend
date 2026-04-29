import "dotenv/config";
import { modificarContraseñaAdministrador } from "../repo/admin.repo.js";
import {
  consultarDocentePorCorreo,
  consultarDocentePorId,
  consultarDocentes,
  crearDocente,
  editarDocente,
  eliminarDocenteId,
  validarCorreo,
} from "../repo/docente.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  correoRegistrado,
  docenteId,
  hashear,
  remplazarContraseña,
  validarCampos,
} from "../utils/utilidad.utils.js";

export const registrarNuevoDocente = async (data) => {
  try {
    correoRegistrado(data.correo);

    const infoDocente = await remplazarContraseña(
      validarCampos(data, [
        "nombres",
        "apellidos",
        "escuela",
        "correo",
        "password",
      ]),
    );
    const nuevoDocente = await crearDocente(infoDocente);

    if (!nuevoDocente) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo registrar al docente",
      );
    }

    return nuevoDocente;
  } catch (error) {
    controlErrores(error);
  }
};

export const validarCorreoDocente = async (data) => {
  try {
    if (!consultarDocentePorCorreo(data.correo))
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se ha encontrado el docente asociado al correo",
      );

    const docenteVerificado = await validarCorreo(data.id);

    if (!docenteVerificado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se puedo verificar el correo del docente",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const verInfoDocente = async (data) => {
  try {
    const docente = await consultarDocentePorId(data.id);

    if (!docente) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontró al docente",
      );
    }

    const docenteInfo = {
      nombres: docente.usuario.nombres,
      apellidos: docente.usuario.apellido,
      escuela: docente.escuela,
    };

    return docenteInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const verInfoDocentes = async () => {
  try {
    const docentes = await consultarDocentes();
    if (!docentes) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se encontraron docentes registrados",
      );
    }

    const docentesInfo = docentes.map((datos) => ({
      id: datos.id_docente,
      nombre: datos.usuario.nombres,
      apellidos: datos.usuario.apellido,
      correo: datos.correo,
      password: datos.contraseña,
      escuela: datos.escuela.nombre,
      fechaIngreso: datos.usuario.creado,
      habilitado: datos.autorizado,
      grupos: datos.grupos.map((propiedades) => ({
        id: propiedades.id_grupo,
        nombre: propiedades.nombre_grupo,
      })),
    }));

    return docentesInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const editarInfoDocente = async (data) => {
  try {
    docenteId(data.id);
    const docenteEditado = await editarDocente(data);

    if (!docenteEditado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo editar al docente",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminarDocentePorId = async (data) => {
  try {
    docenteId(data.id);
    const docenteEliminado = await eliminarDocenteId(data.id);

    if (!docenteEliminado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo eliminar al docente",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const actualizarContraseñaDocente = async (data) => {
  try {
    const modificado = await modificarContraseñaAdministrador(
      data.correo,
      hashear(data.password),
    );

    if (!modificado) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo actualizar la contraseña",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};
