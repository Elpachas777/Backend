import { verificarTokenAuth } from "../auth/auth.js";
import * as service from "../services/ejercicios.service.js";
import { obtenerId } from "../utils/utilidad.utils.js";

export const registrarEjercicio = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req.cookies?.access_token || "";
    const docente = verificarTokenAuth(token);

    await service.guardarEjercicio(JSON.stringify(data), docente.id);

    return res.status(200).json({
      tipo: "success",
      mensaje: "Asigna el ejercicio a un grupo",
    });
  } catch (error) {
    next(error);
  }
};

export const listarTipos = async (req, res, next) => {
  try {
    const tipos = await service.listarTipos();
    return res.status(200).json(tipos);
  } catch (error) {
    next(error);
  }
};

export const listar = async (req, res, next) => {
  try {
    const id = obtenerId(req.cookies);
    const ejercicios = await service.listar(id);
    return res.status(200).json(ejercicios);
  } catch (error) {
    next(error);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = JSON.stringify(req.body);
    await service.actualizar(id, data);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Ejercicio actualizado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.eliminar(id);

    return res.status(200).json({
      tipo: "success",
      mensaje: "Ejercicio eliminado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const asignar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await service.asignar(id, data);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Ejercicio asignado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const estadisticasAsignacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.cookies?.access_token || "";
    const docente = verificarTokenAuth(token);

    const estadisticas = await service.estadisticasAsignacionPorEjercicio(
      docente.id,
      id,
    );

    return res.status(200).json(estadisticas);
  } catch (error) {
    next(error);
  }
};
