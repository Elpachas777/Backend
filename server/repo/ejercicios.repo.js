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
    const data = {};

    if (json.titulo !== undefined) {
      data.titulo = String(json.titulo).trim();
    }

    if (json.contenido !== undefined) {
      data.contenido = json.contenido;
    }

    if (json.fecha_inicio) {
      data.fecha_inicio = new Date(json.fecha_inicio);
    }

    if (json.fecha_final) {
      data.fecha_final = new Date(json.fecha_final);
    }

    if (json.id_tipo) {
      data.id_tipo = Number(json.id_tipo);
    }

    return prisma.ejercicio.update({
      where: {
        id_ejercicio: Number(id),
      },
      data,
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

export const listar = (id) => {
  return prisma.ejercicio.findMany({
    where: {
      id_docente: Number(id)
    }
  });
};

export const eliminar = (id) => {
  return prisma.ejercicio.delete({
    where: { id_ejercicio: Number(id), }
  });
};

export const asignar = async (id, id_grupo) => {
  return prisma.ejercicio.update({
    where: {
      id_ejercicio: Number(id)
    },
    data: {
      grupos: {
        connect: {
          id_grupo: Number(id_grupo)
        }
      }
    }
  })
}