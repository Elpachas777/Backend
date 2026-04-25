import {
  enviarTokenCorreo,
  validarTokenCorreo,
} from "../services/correo.service.js";
import {
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
    enviarTokenCorreo(docente);

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
    const docente = await verInfoDocente(req.params);
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
    const { nombres, apellidos, escuela } = req.body;
    const data = { id, nombres, apellidos, escuela };

    await editarInfoDocente(data);

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
    await eliminarDocentePorId(req.params);
    return res.status(200).json({
      tipo: "info",
      mensaje: "Docente eliminado con exito",
    });
  } catch (error) {
    next(error);
  }
}
