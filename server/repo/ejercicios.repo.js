import { prisma } from "../utils/db.utils.js";

export const crearEjercicio = (
  { titulo, fecha_inicio, fecha_final, contenido, tipo },
  docente,
) => {
  return prisma.ejercicio.create({
    data: {
      titulo: titulo,
      fecha_inicio: fecha_inicio,
      fecha_final: fecha_final,
      contenido: contenido,
      id_tipo: tipo,
      docente:{
        connect:{
          id_docente : Number(docente)
        }
      }
    },
  });
};
