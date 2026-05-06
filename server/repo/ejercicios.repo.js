import { prisma } from "../utils/db.utils.js";

export const crearEjercicio = (
  { titulo, fecha_inicio, fecha_final, contenido, id_tipo },
  id,
) => {
  return prisma.ejercicio.create({
    data: {
      titulo: titulo,
      fecha_inicio: new Date(fecha_inicio),
      fecha_final: new Date(fecha_final),
      contenido: contenido,
      docente: {
        connect: {
          id_docente: Number(id),
        },
      },
      tipo: {
        connect: {
          id_tipo: Number(id_tipo),
        },
      },
    },
  });
};

export const actualizar = (id, json) => {
  return prisma.ejercicio.update({
    where: {
      id_ejercicio: Number(id),
    },
    data: json,
  });
};

export const listarTipos = () => {
  return prisma.tipoEjercicio.findMany({
    select: {
      id_tipo: true,
      nombre: true,
    },
  });
};

export const listar = () => {
  return prisma.ejercicio.findMany();
};

export const eliminar = (id) => {
  return prisma.ejercicio.delete({
    where: Number(id),
  });
};
