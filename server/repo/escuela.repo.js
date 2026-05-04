import { prisma } from "../utils/db.utils.js";

export const crear = (data) => {
  return prisma.escuela.create({
    data: data,
  });
};

export const actualizar = (id, data) => {
  return prisma.escuela.update({
    where: {
      id_escuela: Number(id),
    },
    data: data,
  });
};

export const listar = () => {
  return prisma.escuela.findMany({
    include: {
      docentes: {
        include: {
          usuario: true,
        },
      },
    },
  });
};

export const eliminar = (id) => {
  return prisma.escuela.delete({
    where: {
      id_escuela: Number(id),
    },
  });
};
