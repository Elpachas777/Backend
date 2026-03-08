import "dotenv/config";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import { consultarAdmin } from "./admin.service.js";

export async function existe(id) {
  return await prisma.docente.findUnique({
    where: {
      id_docente: Number(id),
    },
  });
}

async function existeCorreo(correo) {
  return await prisma.docente.findUnique({
    where: {
      correo: correo,
    },
  });
}

export async function hashear(password) {
  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUND)
  );
  return passwordHash;
}

export const registrar = async ({ datos }) => {
  const existeAdmin = await consultarAdmin(datos.correo);
  const existeDocente = await existeCorreo(datos.correo);

  if (existeAdmin || existeDocente)
    throw new Error("El correo ya ha sido registrado");

  const passwordHash = await hashear(datos.password);

  const nuevoDocente = await prisma.docente.create({
    data: {
      correo: datos.correo,
      contraseña: passwordHash,
      escuela: datos.escuela,
      usuario: {
        create: {
          nombres: datos.nombres,
          apellido: datos.apellidos,
        },
      },
    },
    include: {
      usuario: true,
    },
  });

  return nuevoDocente;
};

export const verPorCorreo = async (correo) => {
  const docente = await prisma.docente.findUnique({
    where: {
      correo: correo,
    },
  });

  if (!docente) throw new Error("El correo no existe");
  return docente;
};

export const verPorId = async (id) => {
  const docente = await prisma.docente.findUnique({
    where: {
      id_docente: Number(id),
    },
    select: {
      escuela: true,
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
    },
  });

  if (!docente) throw new Error("No se encontró al docente");

  const resultado = {
    nombres: docente.usuario.nombres,
    apellidos: docente.usuario.apellido,
    escuela: docente.escuela,
  };
  return resultado;
};

export const verTodos = async () => {
  const docentes = await prisma.docente.findMany({
    select: {
      id_docente: true,
      correo: true,
      escuela: true,
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
    },
  });

  const resultado = docentes.map((datos) => ({
    id: datos.id_docente,
    nombres: datos.usuario.nombres,
    apellidos: datos.usuario.apellido,
    correo: datos.correo,
    escuela: datos.escuela,
  }));

  return resultado;
};

export const modificarVerificado = async (id, correo) => {
  if (!existe(id)) throw new Error("El correo no existe");

  const docenteVerificado = await prisma.docente.update({
    where: {
      id_docente: id,
    },
    data: {
      autorizado: true,
    },
  });

  return docenteVerificado;
};

export const editar = async (id, datos) => {
  if (!existe(id)) throw new Error("El docente no existe");

  const docenteEditado = await prisma.docente.update({
    where: {
      id_docente: Number(id),
    },
    data: {
      escuela: datos.escuela,
      usuario: {
        update: {
          nombres: datos.nombres,
          apellido: datos.apellidos,
        },
      },
    },
    include: {
      usuario: true,
    },
  });

  return docenteEditado;
};

export const eliminar = async (id) => {
  if (!existe(id)) throw new Error("El correo no ha sido registrado");

  const docenteEliminado = await prisma.docente.delete({
    where: {
      id_docente: Number(id),
    },
  });

  if (!docenteEliminado) throw new Error("No se pudo borrar al docente");

  return docenteEliminado;
};

export const actualizarContraseña = async (correo, password) => {
  const existeAdmin = await consultarAdmin(correo);
  if (existeAdmin) {
    const passwordHash = await hashear(password);
    const modificado = await prisma.administrador.update({
      where: {
        correo: correo,
      },
      data: {
        contraseña: passwordHash,
      },
    });

    return modificado;
  }

  const existeDocente = await existeCorreo(correo);
  if (existeDocente) {
    const passwordHash = await hashear(password);

    const modificado = await prisma.docente.update({
      where: {
        correo: correo,
      },
      data: {
        contraseña: passwordHash,
      },
    });

    return modificado;
  }

  throw new Error("No se encontró la cuenta");
};
