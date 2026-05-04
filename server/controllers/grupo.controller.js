import { verificarToken } from "../services/credenciales.service.js";
import {
  agregarAlumnoGrupo,
  crearGrupoNuevo,
  editarInfoGrupo,
  eliminarGrupoId,
  verInfoGrupo,
  verInfoGrupos,
} from "../services/grupo.service.js";

export const registrarGrupo = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    const { id } = verificarToken(token);
    const { nombre, turno } = req.body;
    const data = { id, nombre, turno };

    await crearGrupoNuevo(data);

    return res.status(200).json({
      tipo: "success",
      mensaje: "Grupo creado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const consultarGrupoInfo = async (req, res, next) => {
  try {
    const grupo = await verInfoGrupo(req.body);
    res.status(200).json(grupo);
  } catch (error) {
    next(error);
  }
};

export const consultarGruposInfo = async (req, res, next) => {
  try {
    const grupos = await verInfoGrupos();

    return res.status(200).json(grupos);
  } catch (error) {
    next(error);
  }
};

export const editarGrupoInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, turno } = req.body;
    const data = { id, nombre, turno };

    await editarInfoGrupo(data);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Grupo modificado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarGrupo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await eliminarGrupoId(id);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Grupo eliminado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const agregarAlumnoAGrupo = async (req, res, next) => {
  try {
    await agregarAlumnoGrupo(req.body);

    res.status(200).json({
      tipo: "success",
      mensaje: "Alumno registrado con exito",
    });
  } catch (error) {
    next(error);
  }
};
