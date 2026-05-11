import "dotenv/config";
import { modificarContraseñaAdministrador } from "../repo/admin.repo.js";
import {
  consultarDocentePorCorreo,
  consultarDocentePorId,
  consultarDocentes,
  crearDocente,
  editarDocente,
  editarDocenteEscuela,
  editarDocenteUsuario,
  eliminarDocenteId,
  modificarContraseñaDocente,
  modificarHabilitado,
  obtenerContraseña,
  validarCorreo,
} from "../repo/docente.repo.js";
import { prisma } from "../utils/db.utils.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  correoRegistrado,
  docenteId,
  hashear,
  objetoVacio,
  peticionVacia,
  quitarVacios,
  remplazarContraseña,
  validarCampos,
  validarContraseña,
} from "../utils/utilidad.utils.js";

export const registrarNuevoDocente = async (data) => {
  try {
    await correoRegistrado(data.correo);

    const infoDocente = await remplazarContraseña(
      validarCampos(data, [
        "nombres",
        "apellidos",
        "escuela",
        "correo",
        "contraseña",
      ]),
    );
    const nuevoDocente = await crearDocente(infoDocente);
    peticionVacia(nuevoDocente, "No se pudo registrar al docente")

    return nuevoDocente;
  } catch (error) {
    controlErrores(error);
  }
};

export const validarCorreoDocente = async (data) => {
  try {
    const docente = await consultarDocentePorCorreo(data.correo)
    if (!docente)
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se ha encontrado el docente asociado al correo",
      );

    const docenteVerificado = await validarCorreo(docente.id_docente);

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

export const verInfoDocente = async (id) => {
  try {
    const docente = await consultarDocentePorId(id);

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
      escuela: {
        id: datos.id_escuela,
        nombre: datos.escuela.nombre,
      },
      fechaIngreso: datos.usuario.creado,
      habilitado: datos.habilitado,
      grupos: datos.grupos.map((propiedades) => ({
        id: propiedades.id_grupo,
        nombre: propiedades.nombre_grupo,
        turno: propiedades.turno
      })),
    }));

    return docentesInfo;
  } catch (error) {
    controlErrores(error);
  }
};

export const editarInfoDocente = async (id, data) => {
  try {
    await docenteId(id);
    const datosUsuario = quitarVacios(data.usuario);
    const datosDocente = quitarVacios(data.docente);
    const { escuela } = data;

    const editado = await prisma.$transaction(async (tx) => {
      if (!objetoVacio(datosUsuario)) {
        await editarDocenteUsuario(tx, id, datosUsuario);
      }

      if (!objetoVacio(datosDocente)) {
        let datos = datosDocente;

        if (Object.hasOwn(datosDocente, "contraseña")) {
          datos = await remplazarContraseña(datosDocente);
        }

        await editarDocente(tx, id, datos);
      }

      if (escuela) {
        await editarDocenteEscuela(tx, id, escuela);
      }



      return "ok";
    });

    if (!editado) {
      throw new ApiError(
        "Alguno de los updates falló",
        500,
        "No se pudo editar al docente",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminarDocentePorId = async (id) => {
  try {
    docenteId(id);
    const docenteEliminado = await eliminarDocenteId(id);

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
    const contra = await hashear(data.password)
    const modificado = await modificarContraseñaDocente(
      data.correo,
      contra,
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

export const actualizarHabilitado = async (id, habilitado) => {
  try {
    const cambio = await modificarHabilitado(id, habilitado);

    if (!cambio) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo actualizar el estado de habilitado",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const comprobarContraseña = async (id, contraseña) => {
  try {
    const res = await obtenerContraseña(id);

    if (!res) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo encontrar la contraseña del docente",
      );
    }

    const validacion = await validarContraseña(contraseña, res.contraseña);
  } catch (error) {
    controlErrores(error);
  }
};
