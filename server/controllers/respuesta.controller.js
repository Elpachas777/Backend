import * as service from "../services/respuesta.service.js";

export async function registrarIntento(req, res, next) {
  try {
    const resultado = await service.guardarIntento(req.body);
    return res.status(201).json({
      tipo: "success",
      mensaje: "Intento registrado",
      ...resultado,
    });
  } catch (error) {
    next(error);
  }
}

export async function consultarResultadosAlumno(req, res, next) {
  try {
    const respuesta = await service.verResultadosAlumno(req.params);
    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
}

export async function consultarResultadosAlumnoEjercicio(req, res, next) {
  try {
    const respuesta = await service.verResultadosAlumnoEjercicio(req.params);
    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
}

export async function consultarSilabasDificiles(req, res, next) {
  try {
    const respuesta = await service.verSilabasDificiles(req.params);
    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
}