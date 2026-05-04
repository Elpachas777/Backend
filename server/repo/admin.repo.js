import { prisma } from "../utils/db.utils.js";

export const crearAdministrador = ({ correo, password, nombres, apellido }) => {
  return prisma.administrador.create({
    data: {
      correo: correo,
      contraseña: password,
      usuario: {
        create: {
          nombres: nombres,
          apellido: apellido,
        },
      },
    },
  });
};

export const obtener = (id) => {
  return prisma.administrador.findUnique({
    where: {
      id_admin: Number(id),
    },
  });
};

export const consultarAdminPorId = (id) => {
  return prisma.administrador.findUnique({
    where: {
      id_admin: id,
    },
    select: {
      id_admin: true,
    },
  });
};

export const consultarAdminPorCorreo = (correo) => {
  return prisma.administrador.findUnique({
    where: {
      correo: correo,
    },
  });
};

export const modificarContraseñaAdministrador = (correo, passwordHash) => {
  return prisma.administrador.update({
    where: {
      correo: correo,
    },
    data: {
      contraseña: passwordHash,
    },
  });
};
