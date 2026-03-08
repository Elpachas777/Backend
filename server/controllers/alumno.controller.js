import { prisma } from "../db.js";
import {
  editar,
  eliminar,
  registrar,
  verUno,
} from "../services/alumno.service.js";

export const registrarAlumno = async (req, res) => {
  try {
    const { nombre, apellidos } = req.body;
    await registrar(nombre, apellidos);

    return res
      .status(200)
      .json({ tipo: "success", mensaje: "Alumno creado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo registrar al Alumno" });
  }
};

export const registrarAlumno2 = async (nombre, apellidos, idGrupo) => {
  const nuevoalumno = await prisma.alumno.create({
    data: {
      grupo: {
        connect: {
          id_grupo: Number(idGrupo),
        },
      },
      usuario: {
        create: {
          nombres: nombre,
          apellido: apellidos,
        },
      },
    },
    include: {
      usuario: true,
      grupo: true,
    },
  });

  const data = {
    id: nuevoalumno.id_alumno,
    nombres: nuevoalumno.usuario.nombres,
    apellidos: nuevoalumno.usuario.apellido,
  };

  return data;
};

export const verAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await verUno(id);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: "No encontró al alumno" });
  }
};

export const verAlumnos = async (req, res) => {
  const alumnos = await prisma.alumno.findMany({
    select: {
      id_alumno: true,
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
    },
  });

  const resultado = alumnos.map((datos) => ({
    id: datos.id_alumno,
    nombres: datos.usuario.nombres,
    apellidos: datos.usuario.apellido,
  }));

  return res.json(resultado);
};

export const modificarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos } = req.body;

    await editar(id, nombre, apellidos);

    return res
      .status(200)
      .json({ tipo: "info", mensaje: "Alumno editado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo editar al Alumno" });
  }
};

export const eliminarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminar(id);
    res
      .status(200)
      .json({ tipo: "info", mensaje: "Alumno eliminado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo eliminar al Alumno" });
  }
};

export const verAlumnosGrupo = async (req, res) => {
  const { id } = req.params;
  const alumnos = await prisma.alumno.findMany({
    where: {
      id_grupo: Number(id),
    },
    omit: {
      id_grupo: true,
    },
    include: {
      usuario: true,
    },
  });

  const resultado = alumnos.map((datos) => ({
    id: datos.id_alumno,
    nombres: datos.usuario.nombres,
    apellidos: datos.usuario.apellido,
  }));

  return res.send(resultado);
};
