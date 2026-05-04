import "dotenv/config";
import { verificarTokenAuth } from "../auth/auth.js";
import { consultarAdminPorCorreo } from "../repo/admin.repo.js";
import { consultarDocentePorCorreo } from "../repo/docente.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import { controlErrores, validarContraseña } from "../utils/utilidad.utils.js";
import { actualizarContraseñaAdministador } from "./admin.service.js";
import { actualizarContraseñaDocente } from "./docente.service.js";

export const login = async ({ correo, password }) => {
  try {
    const admin = await consultarAdminPorCorreo(correo);
    if (admin) {
      await validarContraseña(password, admin.contraseña);

      return {
        id: admin.id_admin,
        correo: admin.correo,
        rol: "admin",
      };
    }

    const docente = await consultarDocentePorCorreo(correo);

    if (docente) {
      await validarContraseña(password, docente.contraseña);

      return {
        id: docente.id_docente,
        correo: docente.correo,
        rol: "docente",
      };
    }

    throw new ApiError(
      "El correo no se ha registrado o no se encuentra",
      401,
      "Credenciales incorrectas",
    );
  } catch (error) {
    controlErrores(error);
  }
};

export const correoRecuperarContraseña = async (data) => {
  try {
    const admin = await consultarAdminPorCorreo(data.correo);

    if (admin) {
      return {
        id: admin.id_admin,
        correo: admin.correo,
        tipo: "recuperación",
      };
    }

    const docente = await consultarDocentePorCorreo(correo);

    if (docente) {
      return {
        id: docente.id_docente,
        correo: docente.correo,
        tipo: "recuperación",
      };
    }

    throw new ApiError(
      "El correo no se ha registrado o no se encuentra",
      401,
      "No se ha encontrado un usuario asociado al correo",
    );
  } catch (error) {
    controlErrores(error);
  }
};

export const modificarContraseña = async (data) => {
  try {
    const datosToken = verificarTokenAuth(data.token);
    if (datosToken.tipo !== "recuperación") {
      throw new ApiError(
        "El tipo de token no es de recuperación",
        401,
        "Token invalido",
      );
    }

    const datos = { correo: datosToken.correo, password: data.password };
    const existeAdmin = await consultarAdminPorCorreo(datosToken.correo);

    if (existeAdmin) {
      await actualizarContraseñaDocente(datos);
      return;
    }

    const existeDocente = await consultarDocentePorCorreo(datosToken.correo);

    if (existeDocente) {
      await actualizarContraseñaAdministador(datos);
      return;
    }

    throw new ApiError(
      "El correo no esta vinculado a ningun usuario",
      400,
      "El correo no esta registrado",
    );
  } catch (error) {
    controlErrores(error);
  }
};
