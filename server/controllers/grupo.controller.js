import { actualizarId } from "../services/alumno.service.js";
import * as service from "../services/grupo.service.js";
import { obtenerId } from "../utils/utilidad.utils.js";

export const registrarGrupo = async (req, res, next) => {
  try {
    const id = obtenerId(req.cookies);
    const { nombre, turno } = req.body;
    const data = { id, nombre, turno };

    await service.crearGrupoNuevo(data);

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
    const grupo = await service.verInfoGrupo(req.body);
    res.status(200).json(grupo);
  } catch (error) {
    next(error);
  }
};

export const consultarGruposInfo = async (req, res, next) => {
  try {
    const id = obtenerId(req.cookies);
    const grupos = await service.verInfoGrupos(id);

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

    await service.editarInfoGrupo(data);

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
    await service.eliminarGrupoId(id);

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
    const { id } = req.params;
    const { grupo, alumnos } = req.body;

    await service.agregarAlumnoGrupo(id, alumnos);

    for (const alumno of alumnos) {
      await actualizarId(alumno.id, grupo, alumno.apellidos);
    }


    res.status(200).json({
      tipo: "success",
      mensaje: "Alumno registrado con exito",
    });
  } catch (error) {
    next(error);
  }
};

export async function listarAlumnos(req, res, next) {
  try {
    const { id } = req.params
    const lista = await service.listarAlumnos(id)

    res.status(200).json(lista)
  } catch (error) {
    next(error)
  }
}