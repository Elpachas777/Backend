import {
  crearAdministrador,
  modificarContraseñaAdministrador,
} from "../repo/admin.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import {
  controlErrores,
  remplazarContraseña,
  validarCampos,
} from "../utils/utilidad.utils.js";

export const registrarNuevoAdministrador = async (data) => {
  try {
    const infoAdmin = await remplazarContraseña(
      validarCampos(data, ["correo", "password", "nombres", "apellido"]),
    );

    const nuevoAdministrador = await crearAdministrador(infoAdmin);

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

export const actualizarContraseñaAdministador = async (data) => {
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
