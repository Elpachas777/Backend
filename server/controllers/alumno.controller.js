import * as service from "../services/alumno.service.js";
import { obtenerId } from "../utils/utilidad.utils.js";

export async function registrarAlumno(req, res, next) {
  try {
    const id = obtenerId(req.cookies)
    const data = req.body
    await service.registrarNuevoAlumno(id, data );

    return res.status(200).json({
      tipo: "success",
      mensaje: "Alumno registrado con exito",
    });
  } catch (error) {
    next(error);
  }
}

export async function consultarAlumnoInfo(req, res, next) {
  try {
    const respuesta = await service.verInfoAlumno(req.params);
    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
}

export async function consultarAlumnosInfo(req, res, next) {
  try {
    const id = obtenerId(req.cookies)
    const resultado = await service.verInfoAlumnos(id);
    
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

export async function modificarAlumno(req, res, next) {
  try {
    const { id } = req.params;
    const { nombres, apellidos } = req.body;

    const data = { id, nombres, apellidos };

    await service.editarInfoAlumno(data);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Alumno editado con exito",
    });
  } catch (error) {
    next(error);
  }
}

export async function eliminarAlumno(req, res, next) {
  try {
    await service.eliminarAlumnoPorId(req.params);
    return res.status(200).json({
      tipo: "info",
      mensaje: "Alumno eliminado con exito",
    });
  } catch (error) {
    next(error);
  }
}

export async function verAlumnosGrupo(req, res, next) {
  try {
    const respuesta = await service.verAlumnosEnGrupo(req.params);

    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
}