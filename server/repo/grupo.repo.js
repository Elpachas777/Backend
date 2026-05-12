import { prisma } from "../utils/db.utils.js";

export const crearGrupo = ({ nombre, turno, id }) => {
  return prisma.grupo.create({
    data: {
      nombre_grupo: nombre,
      id_docente: Number(id),
      turno: turno,
    },
  });
};

export const consultarGrupoPorId = (id) => {
  return prisma.grupo.findUnique({
    where: {
      id_grupo: Number(id),
    },
  });
};

export const consultarGrupoPorNombre = (nombre) => {
  return prisma.grupo.findUnique({
    where: {
      nombre: nombre,
    },
  });
};

export const consultarGrupos = (id) => {
  return prisma.grupo.findMany({
    where: {
      id_docente: Number(id),
    },
    include:{
      ejercicios : true
    }
  });
};

export const listarAlumnos = (id) => {
  return prisma.alumno.findMany({
    where: {
      id_grupo: Number(id)
    },
    include: {
      usuario: true,
      grupo: true
    }
  })
}

export const editarGrupo = ({ id, nombre, turno }) => {
  return prisma.grupo.update({
    where: {
      id_grupo: Number(id),
    },
    data: {
      nombre_grupo: nombre,
      turno: turno,
    },
  });
};

export const eliminarGrupoPorId = (id) => {
  return prisma.grupo.delete({
    where: {
      id_grupo: Number(id),
    },
  });
};

export const eliminarAlumnos = () => {
  return prisma.alumno.updateMany({
    where: {
      id_grupo: null
    },
    data: {
      id_ingreso: null,
    }
  })
}

export const agregar = (id_grupo, datos) => {
  return prisma.alumno.updateMany({
    where: {
      id_alumno: {
        in: datos,
      },
      id_grupo: null,
    },
    data: {
      id_grupo: Number(id_grupo),
    },
  });
};

export const eliminarAlumno = (id_grupo, alumnos) => {
  return prisma.alumno.updateMany({
    where: {
      id_grupo: Number(id_grupo),
      id_ingreso: {
        in: alumnos
      }
    },
    data: {
      id_ingreso: null,
      id_grupo: null
    }
  })
}