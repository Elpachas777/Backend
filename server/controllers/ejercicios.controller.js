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
      mensaje: "Ejercicio guardado con exito",
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
    const id = obtenerId(req.cookies)
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
      tipo: "success",
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
