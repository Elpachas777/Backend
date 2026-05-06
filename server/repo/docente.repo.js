import { prisma } from "../utils/db.utils.js";

export const consultarDocentePorId = (id) => {
  return prisma.docente.findUnique({
    where: {
      id_docente: Number(id),
    },
    include: {
      usuario: true,
      escuela: true,
    },
  });
};

export const consultarDocentePorCorreo = (correo) => {
  return prisma.docente.findUnique({
    where: {
      correo: correo,
    },
    include:{
      usuario: true
    }
  });
};

export const crearDocente = ({
  correo,
  contraseña,
  escuela,
  nombres,
  apellidos,
}) => {
  return prisma.docente.create({
    data: {
      correo: correo,
      contraseña: contraseña,
      usuario: {
        create: {
          nombres: nombres,
          apellido: apellidos,
        },
      },
      escuela: {
        connect: {
          id_escuela: Number(escuela),
        },
      },
    },
    include: {
      usuario: true,
      escuela: true,
    },
  });
};

export const validarCorreo = (id) => {
  return prisma.docente.update({
    where: {
      id_docente: id,
    },
    data: {
      habilitado: true,
    },
  });
};

export const consultarDocentes = () => {
  return prisma.docente.findMany({
    include: {
      usuario: true,
      escuela: true,
      grupos: true,
    },
  });
};

export const editarDocente = (db, id, data) => {
  return db.docente.update({
    where: {
      id_docente: Number(id),
    },
    data: data,
  });
};

export const editarDocenteUsuario = (db, id, data) => {
  return db.docente.update({
    where: {
      id_docente: Number(id),
    },
    data: {
      usuario: {
        update: data,
      },
    },
    include: {
      usuario: true,
    },
  });
};

export const editarDocenteEscuela = (db, id, escuela) => {
  return db.docente.update({
    where: {
      id_docente: Number(id),
    },
    data: {
      escuela: {
        connect: {
          id_escuela: Number(escuela),
        },
      },
    },
    include: {
      escuela: true,
    },
  });
};

export const eliminarDocenteId = (id) => {
  return prisma.docente.delete({
    where: {
      id_docente: Number(id),
    },
  });
};

export const modificarContraseñaDocente = (correo, passwordHash) => {
  return prisma.docente.update({
    where: {
      correo: correo,
    },
    data: {
      contraseña: passwordHash,
    },
  });
};

export const modificarHabilitado = (id, habilitado) => {
  return prisma.docente.update({
    where: {
      id_docente: Number(id),
    },
    data: {
      habilitado: habilitado,
    },
  });
};

export const obtenerContraseña = (id) => {
  return prisma.docente.findUnique({
    where: {
      id_docente: Number(id),
    },
    select: {
      contraseña: true,
    },
  });
};
