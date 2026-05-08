import { prisma } from "../utils/db.utils.js";

export const crearGrupo = ({ nombre, turno, id }) => {
  return prisma.grupo.create({
    data: {
      nombre_grupo: nombre,
      id_docente: Number(id),
      turno: turno,
    },
  });
};

export const consultarGrupoPorId = (id) => {
  return prisma.grupo.findUnique({
    where: {
      id_grupo: Number(id),
    },
  });
};

export const consultarGrupoPorNombre = (nombre) => {
  return prisma.grupo.findUnique({
    where: {
      nombre: nombre,
    },
  });
};

export const consultarGrupos = (id) => {
  return prisma.grupo.findMany({
    where: {
      id_docente: Number(id),
    }
  });
};

export const listarAlumnos = (id) => {
  return prisma.grupo.findUnique({
    where: {
      id_grupo: Number(id)
    },
    include: {
      alumnos: {
        include: {
          usuario: true
        }
      }
    }
  })
}

export const editarGrupo = ({ id, nombre, turno }) => {
  return prisma.grupo.update({
    where: {
      id_grupo: Number(id),
    },
    data: {
      nombre_grupo: nombre,
      turno: turno,
    },
  });
};

export const eliminarGrupoPorId = (id) => {
  return prisma.grupo.delete({
    where: {
      id_grupo: Number(id),
    },
  });
};

export const agregar = (id_grupo, datos) => {
  return prisma.alumno.updateMany({
    where: {
      id_alumno: {
        in: datos,
      },
    },
    data: {
      id_grupo: Number(id_grupo),
    },
  });
};
