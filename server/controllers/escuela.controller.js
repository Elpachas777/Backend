import * as service from "../services/escuela.service.js";

export const crear = async (req, res, next) => {
  try {
    const data = req.body;
    await service.crear(data);

    return res.status(201).json({
      tipo: "success",
      mensaje: "Escuela registrada con éxito",
    });
  } catch (error) {
    next(error);
  }
};

export const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await service.actualizar(id, data);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Escuela actualizada con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const listar = async (req, res, next) => {
  try {
    const escuelas = await service.listar();
    return res.status(200).json(escuelas);
  } catch (error) {
    next(error);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.eliminar(id);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Escuela eliminada con exito",
    });
  } catch (error) {
    next(error);
  }
};
