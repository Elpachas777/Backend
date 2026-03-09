import { prisma } from "../utils/db.utils.js";

export const crearGrupo = ({ nombre, turno, id }) => {
  return prisma.grupo.create({
    data: {
      nombre_grupo: nombre,
      turno: turno,
      id_docente: Number(id),
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

export const consultarGrupos = () => {
  return prisma.grupo.findMany({
    omit: {
      id_docente: true,
    },
  });
};

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
