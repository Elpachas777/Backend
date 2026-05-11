import { enviarTokenCorreo, validarTokenCorreo } from "../services/correo.service.js";
import * as service from "../services/docente.service.js";

export async function registarDocente(req, res, next) {
  try {
    const docente = await service.registrarNuevoDocente(req.body);
    await enviarTokenCorreo(docente);

    return res.status(201).json({
      tipo: "success",
      mensaje:
        "Docente registrado con exito, favor de revisar el correo enviado.",
    });
  } catch (error) {
    next(error);
  }
}

export async function verificarCorreoDocente(req, res, next) {
  try {
    const datosToken = validarTokenCorreo(req.query);
    await service.validarCorreoDocente(datosToken);

    return res.redirect(process.env.URL_FRONT_END);
  } catch (error) {
    next(error);
  }
}

export async function consultarDocenteInfo(req, res, next) {
  try {
    const { id } = req.params;
    const docente = await service.verInfoDocente(id);
    return res.status(200).json(docente);
  } catch (error) {
    next(error);
  }
}

export async function consultarDocentesInfo(req, res, next) {
  try {
    const docentes = await service.verInfoDocentes();
    return res.status(200).json(docentes);
  } catch (error) {
    next(error);
  }
}

export async function editarDocenteInfo(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    await service.editarInfoDocente(id, data);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Usuario editado con exito",
    });
  } catch (error) {
    next(error);
  }
}

export async function eliminarDocente(req, res, next) {
  try {
    const { id } = req.params;
    await service.eliminarDocentePorId(id);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Docente eliminado con exito",
    });
  } catch (error) {
    next(error);
  }
}

export async function cambiarHabilitado(req, res, next) {
  try {
    const { id } = req.params;
    const { habilitado } = req.body;

    await service.actualizarHabilitado(id, habilitado);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Se ha actualizado el estado de habilitado del docente",
    });
  } catch (error) {
    next(error);
  }
}

export async function checarContraseña(req, res, next) {
  try {
    const { id } = req.params;
    const { contraseña } = req.body;

    await service.comprobarContraseña(id, contraseña);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Las contraseñas coinciden",
    });
  } catch (error) {
    next(error);
  }
}

