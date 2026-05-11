import * as repo from "../repo/admin.repo.js";
import { consultarDocentePorId } from "../repo/docente.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  hashear,
  remplazarContraseña,
  validarCampos,
  validarContraseña,
} from "../utils/utilidad.utils.js";

export const registrarNuevoAdministrador = async (data) => {
  try {
    const infoAdmin = await remplazarContraseña(
      validarCampos(data, ["correo", "contraseña", "nombres", "apellido"]),
    );

    const nuevoAdministrador = await repo.crearAdministrador(infoAdmin);

    if (!nuevoAdministrador) {
      throw new ApiError(
        "La petición devuelve un registro vacio",
        500,
        "No se pudo registrar el administrador",
      );
    }
  } catch (error) {
    controlErrores(error);
  }
};

export const verificar = async (id, rol, contraseña) => {
  try {
    let contraseñaHash = "";

    if (rol == "admin") {
      const administrador = await repo.obtener(id);
      contraseñaHash = administrador.contraseña;
    } else if (rol == "docente") {
      const docente = await consultarDocentePorId(id);
      contraseñaHash = docente.contraseña;
    }
    await validarContraseña(contraseña, contraseñaHash);
  } catch (error) {
    controlErrores(error);
  }
};

export const actualizarContraseñaAdministador = async (data) => {
  try {
    const contra = await hashear(data.password)
    const modificado = await repo.modificarContraseñaAdministrador(
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
