import { prisma } from "../utils/db.utils.js";

export const crearAlumno = (id, { nombre, apellidos }) => {
  return prisma.alumno.create({
    data: {
      usuario: {
        create: {
          nombres: nombre,
          apellido: apellidos,
        },
      },
      docente: {
        connect: {
          id_docente: Number(id)
        }
      }
    },
    include: {
      usuario: true,
    },
  });
};

export const crearAlumnoGrupo = ({ idGrupo, nombre, apellidos }) => {
  return prisma.alumno.create({
    data: {
      grupo: {
        connect: {
          id_grupo: Number(idGrupo),
        },
      },
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
};

export const consultarAlumnoPorDatos = ({ nombre, apellidos }) => {
  return prisma.alumno.findFirst({
    where: {
      usuario: {
        nombres: nombre,
        apellido: apellidos,
      },
    },
  });
};

export const consultarAlumnoPorId = ({ id }) => {
  return prisma.alumno.findUnique({
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
};

export const consultarAlumnos = (id) => {
  return prisma.alumno.findMany({
    where: {
      id_docente: Number(id)
    },
    select: {
      id_alumno: true,
      id_ingreso: true,
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
      grupo: {
        select: {
          nombre_grupo: true
        }
      }
    },
  });
};

export const modificarInfoAlumno = ({ id, nombres, apellidos }) => {
  return prisma.alumno.update({
    where: {
      id_alumno: Number(id),
    },
    data: {
      usuario: {
        update: {
          nombres: nombres,
          apellido: apellidos,
        },
      },
    },
    select: {
      usuario: {
        select: {
          nombres: true,
        },
      },
    },
  });
};

export const eliminarAlumnoId = (id) => {
  return prisma.alumno.delete({
    where: {
      id_alumno: Number(id),
    },
  });
};

export const verAlumnosGrupoId = ({ id }) => {
  return prisma.alumno.findMany({
    where: {
      id_grupo: Number(id),
    },
    omit: {
      id_grupo: true,
    },
    include: {
      usuario: true,
    },
  });
};

export const agregarAlumno = ({ idAlumno, idGrupo }) => {
  return prisma.alumno.update({
    where: {
      id_alumno: Number(idAlumno),
    },
    data: {
      id_grupo: Number(idGrupo),
    },
  });
};

export const contarIds = (inicio) => {
  return prisma.alumno.count({
    where: {
      id_ingreso: {
        startsWith: inicio
      }
    }
  })
}

export const actualizarId = (id, id_ingreso) => {
  return prisma.alumno.update({
    where: {
      id_alumno: Number(id)
    },
    data: {
      id_ingreso: id_ingreso
    }
  })
}

export const consultarAlumnoConEjerciciosPorIdIngreso = (id_ingreso) => {
  const idLimpio = String(id_ingreso ?? "").trim();

  return prisma.alumno.findFirst({
    where: {
      id_ingreso: {
        equals: idLimpio,
      },
    },
    select: {
      id_alumno: true,
      id_ingreso: true,
      usuario: {
        select: {
          nombres: true,
          apellido: true,
        },
      },
      grupo: {
        select: {
          id_grupo: true,
          nombre_grupo: true,
          ejercicios: {
            select: {
              id_ejercicio: true,
              titulo: true,
              fecha_inicio: true,
              fecha_final: true,
              tipo: {
                select: {
                  id_tipo: true,
                  nombre: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const buscarIdsIngresoSimilares = async (idIngreso) => {
  // Devuelve hasta 5 ids parecidos para diagnóstico (mismo prefijo de 4 chars)
  const prefijo = String(idIngreso ?? "").trim().slice(0, 4);
  if (!prefijo) return [];

  const resultados = await prisma.alumno.findMany({
    where: {
      id_ingreso: {
        startsWith: prefijo,
      },
    },
    select: { id_ingreso: true },
    take: 5,
  });
  return resultados.map((r) => r.id_ingreso);
};

export const modificarId = (id_vieja, id_nueva) => {
  return prisma.alumno.update({
    where: {
      id_ingreso: id_vieja
    },
    data: {
      id_ingreso: id_nueva
    }
  })
}