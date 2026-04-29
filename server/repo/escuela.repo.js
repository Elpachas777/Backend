import { prisma } from "../utils/db.utils.js";

export const consultarEscuelas = () => {
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
