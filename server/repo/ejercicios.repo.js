import { prisma } from "../utils/db.utils.js";

export const crearEjercicio = ({
  titulo,
  fecha_inicio,
  fecha_final,
  contenido,
  tipo,
  grupo,
  docente,
}) => {
  return prisma.ejercicio.create({
    data: {
      titulo: titulo,
      fecha_inicio: fecha_inicio,
      fecha_final: fecha_final,
      contenido: contenido,
      id_tipo: tipo,
      id_grupo: grupo,
      id_docente: docente,
    },
  });
};
