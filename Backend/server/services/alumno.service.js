import { prisma } from "../db.js";

export const registrar = async (nombre, apellidos) => {
  const nuevoAlumno = await prisma.alumno.create({
    data: {
      usuario: {
        create: {
          nombres: nombre,
          apellido: apellidos,
        },
      },
    },
    include: {
      usuario: true,
    },
  });

  return nuevoAlumno;
};

export const agregarAGrupo = async (idAlumno, idGrupo) => {
  const alumnoAgregado = await prisma.alumno.update({
    where: {
      id_alumno: Number(idAlumno),
    },
    data: {
      id_grupo: Number(idGrupo),
    },
  });

  return alumnoAgregado;
};

export const editar = async (id, nombre, apellidos) => {
  const alumnoModificado = await prisma.alumno.update({
    where: {
      id_alumno: Number(id),
    },
    data: {
      usuario: {
        update: {
          nombres: nombre,
          apellido: apellidos,
        },
      },
    },
  });

  return alumnoModificado;
};

export const eliminar = async (id) => {
  const alumnoEliminado = await prisma.alumno.delete({
    where: {
      id_alumno: Number(id),
    },
  });

  return alumnoEliminado;
};

export const verUno = async (id) => {
  const alumno = await prisma.alumno.findFirst({
    where: {
      id_alumno: Number(id),
    },
    select: {
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
    },
  });

  const alumnoEncontrado = {
    nombre: alumno.usuario.nombres,
    apellidos: alumno.usuario.apellido,
  };

  return alumnoEncontrado;
};

export const verPorDatos = async (nombre, apellidos) => {
  const alumno = await prisma.alumno.findFirst({
    where: {
      usuario: {
        nombres: nombre,
        apellido: apellidos,
      },
    },
  });

  return alumno;
};
