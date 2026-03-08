import { prisma } from "../db.js";

export const existeGrupo = async (id) => {
  const grupo = await prisma.grupo.findUnique({
    where: {
      id_grupo: Number(id),
    },
  });

  return grupo;
};

export const crear = async (id, nombre, turno) => {
  const nuevoGrupo = await prisma.grupo.create({
    data: {
      nombre_grupo: nombre,
      turno: turno,
      id_docente: Number(id),
    },
  });

  return nuevoGrupo;
};

export const eliminar = async (id) => {
  const grupoEliminado = await prisma.grupo.delete({
    where: {
      id_grupo: Number(id),
    },
  });

  return grupoEliminado;
};

export const editar = async (id, nombre, turno) => {
  const grupoModificado = await prisma.grupo.update({
    where: {
      id_grupo: Number(id),
    },
    data: {
      nombre_grupo: nombre,
      turno: turno,
    },
  });

  return grupoModificado;
};
