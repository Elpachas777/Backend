import { prisma } from "../db.js";
import { agregarAGrupo, verPorDatos } from "../services/alumno.service.js";
import { existe, verPorId } from "../services/docente.service.js";
import {
  crear,
  editar,
  eliminar,
  existeGrupo,
} from "../services/grupo.service.js";
import { registrarAlumno2, verAlumno } from "./alumno.controller.js";

export const registrarGrupo = async (req, res) => {
  try {
    const { id } = req.user.sesion;

    if (!existe(id)) {
      return res.status(400).json({
        tipo: "error",
        mensaje: "No se encontro al docente titular del grupo",
      });
    }

    const { nombre, turno } = req.body;

    await crear(id, nombre, turno);

    res
      .status(200)
      .json({ tipo: "success", mensaje: "Grupo creado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo crear el grupo" });
  }
};

export const verGrupo = async (req, res) => {
  const grupo = await prisma.grupo.findUnique({
    where: {
      nombre: req.body,
    },
  });
  res.json(grupo);
};

export const verGrupos = async (req, res) => {
  const grupos = await prisma.grupo.findMany({
    omit: {
      id_docente: true,
    },
  });

  const data = grupos.map((datos) => ({
    id: datos.id_grupo,
    nombre: datos.nombre_grupo,
    turno: datos.turno,
  }));

  return res.send(data);
};

export const modificarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!existeGrupo(id)) {
      return res
        .status(400)
        .json({ tipo: "error", mensaje: "No se encontrpo el grupo" });
    }

    const { nombre, turno } = req.body;

    await editar(id, nombre, turno);

    res
      .status(200)
      .json({ tipo: "info", mensaje: "Grupo modificado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo modificar el grupo" });
  }
};

export const eliminarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!existeGrupo(id)) {
      return res
        .status(400)
        .json({ tipo: "error", mensaje: "No se encontrpo el grupo" });
    }

    await eliminar(id);

    res
      .status(200)
      .json({ tipo: "info", mensaje: "Grupo eliminado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo eliminar el grupo" });
  }
};

export const agregarAlumno = async (req, res) => {
  try {
    const { id, data } = req.body;

    const alumno = await verPorDatos(data.nombre, data.apellidos);

    if (alumno) {
      await agregarAGrupo(alumno.id_alumno, id);
      return res
        .status(200)
        .json({ tipo: "info", mensaje: "Alumno agregado con exito" });
    }

    const nuevoAlumno = await registrarAlumno2(data.nombre, data.apellidos, id);

    if (!nuevoAlumno) {
      res
        .status(400)
        .json({ tipo: "error", mensaje: "No se pudo crear el alumno" });
    }

    res.status(200).json({
      tipo: "success",
      mensaje: "Alumno creado y registrado con exito",
    });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo agregar el alumno" });
  }
};
