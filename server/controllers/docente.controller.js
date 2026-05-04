import { validarTokenCorreo } from "../services/correo.service.js";
import {
  actualizarHabilitado,
  comprobarContraseña,
  editarInfoDocente,
  eliminarDocentePorId,
  registrarNuevoDocente,
  validarCorreoDocente,
  verInfoDocente,
  verInfoDocentes,
} from "../services/docente.service.js";

export async function registarDocente(req, res, next) {
  try {
    const docente = await registrarNuevoDocente(req.body);
    //    enviarTokenCorreo(docente);

    res.status(201).json({
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
    await validarCorreoDocente(datosToken.id, datosToken.correo);

    res.status(201).json({
      tipo: "info",
      mensaje: "Correo verificado con exito",
    });
  } catch (error) {
    next(error);
  }
}

export async function consultarDocenteInfo(req, res, next) {
  try {
    const { id } = req.params;
    const docente = await verInfoDocente(id);
    res.status(200).json(docente);
  } catch (error) {
    next(error);
  }
}

export async function consultarDocentesInfo(req, res, next) {
  try {
    const docentes = await verInfoDocentes();
    res.status(200).json(docentes);
  } catch (error) {
    next(error);
  }
}

export async function editarDocenteInfo(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    await editarInfoDocente(id, data);

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
    await eliminarDocentePorId(id);

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

    await actualizarHabilitado(id, habilitado);

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

    await comprobarContraseña(id, contraseña);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Las contraseñas coinciden",
    });
  } catch (error) {
    next(error);
  }
}
