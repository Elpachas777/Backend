import { prisma } from "../utils/db.utils";

export const crearEjercicio = ({ data }) => {
  return prisma.ejercicio.create({
    data: data,
  });
};
