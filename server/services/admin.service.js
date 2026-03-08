import { prisma } from "../db.js";
import { hashear } from "./docente.service.js";

export const crearAdmin = async (datos) => {
  const passwordHash = await hashear(datos.password);

  const nuevoAdmin = await prisma.administrador.create({
    data: {
      correo: datos.correo,
      contraseña: passwordHash,
      usuario: {
        create: {
          nombres: datos.nombres,
          apellido: datos.apellido,
        },
      },
    },
  });

  return nuevoAdmin;
};

export const consultarAdmin = async (correo) => {
  const admin = await prisma.administrador.findUnique({
    where: {
      correo: correo,
    },
    select: {
      id_admin: true,
      correo: true,
    },
  });

  return admin;
};
