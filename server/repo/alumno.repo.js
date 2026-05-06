import { prisma } from "../utils/db.utils.js";

export const crearAlumno = (id, { nombre, apellidos }) => {
  return prisma.alumno.create({
    data: {
      usuario: {
        create: {
          nombres: nombre,
          apellido: apellidos,
        },
      },
      docente:{
        connect:{
          id_docente: Number(id)
        }
      }
    },
    include: {
      usuario: true,
    },
  });
};

export const crearAlumnoGrupo = ({ idGrupo, nombre, apellidos }) => {
  return prisma.alumno.create({
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
    },
  });
};

export const consultarAlumnoPorDatos = ({ nombre, apellidos }) => {
  return prisma.alumno.findFirst({
    where: {
      usuario: {
        nombres: nombre,
        apellido: apellidos,
      },
    },
  });
};

export const consultarAlumnoPorId = ({ id }) => {
  return prisma.alumno.findUnique({
    where: {
      id_alumno: Number(id),
    },
    select: {
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
    },
  });
};

export const consultarAlumnos = (id) => {
  return prisma.alumno.findMany({
    where:{
      id_docente : Number(id)
    },
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
};

export const modificarInfoAlumno = ({ id, nombres, apellidos }) => {
  return prisma.alumno.update({
    where: {
      id_alumno: Number(id),
    },
    data: {
      usuario: {
        update: {
          nombres: nombres,
          apellido: apellidos,
        },
      },
    },
    select: {
      usuario: {
        select: {
          nombres: true,
        },
      },
    },
  });
};

export const eliminarAlumnoId = (id) => {
  return prisma.alumno.delete({
    where: {
      id_alumno: Number(id),
    },
  });
};

export const verAlumnosGrupoId = ({ id }) => {
  return prisma.alumno.findMany({
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
};

export const agregarAlumno = ({ idAlumno, idGrupo }) => {
  return prisma.alumno.update({
    where: {
      id_alumno: Number(idAlumno),
    },
    data: {
      id_grupo: Number(idGrupo),
    },
  });
};
