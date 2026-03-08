import "dotenv/config";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";

export const login = async (correo, password) => {
  const admin = await prisma.administrador.findUnique({
    where: {
      correo: correo,
    },
  });

  if (admin) {
    const valido = await bcrypt.compare(password, admin.contraseña);
    if (!valido) throw new Error("Contraseña invalida");
    return {
      id: admin.id_admin,
      correo: admin.correo,
      rol: "admin",
    };
  }
  const docente = await prisma.docente.findUnique({
    where: {
      correo: correo,
    },
  });

  if (docente) {
    const valido = await bcrypt.compare(password, docente.contraseña);
    if (!valido) throw new Error("Contraseña invalida");
    return {
      id: docente.id_docente,
      correo: docente.correo,
      rol: "docente",
    };
  }

  return null;
};
