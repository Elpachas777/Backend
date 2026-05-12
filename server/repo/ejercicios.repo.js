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

export const estadisticasAsignacionPorEjercicio = async (
  id_docente,
  id_ejercicio,
) => {
  const grupos = await prisma.grupo.findMany({
    where: {
      id_docente: Number(id_docente),
    },
    select: {
      id_grupo: true,
      nombre_grupo: true,
      turno: true,
      alumnos: {
        select: {
          id_alumno: true,
        },
      },
      ejercicios: {
        where: {
          id_ejercicio: Number(id_ejercicio),
        },
        select: {
          id_ejercicio: true,
        },
      },
    },
    orderBy: {
      nombre_grupo: "asc",
    },
  });

  const grupoIds = grupos.map((grupo) => grupo.id_grupo);

  if (grupoIds.length === 0) {
    return [];
  }

  const respuestas = await prisma.respuesta.findMany({
    where: {
      id_ejercicio: Number(id_ejercicio),
      alumno: {
        id_docente: Number(id_docente),
        id_grupo: {
          in: grupoIds,
        },
      },
    },
    select: {
      id_alumno: true,
      id_intento: true,
      puntaje: true,
      alumno: {
        select: {
          id_grupo: true,
        },
      },
    },
  });

  const intentosMap = new Map();

  respuestas.forEach((respuesta) => {
    const idGrupo = respuesta.alumno?.id_grupo;

    if (!idGrupo) return;

    const claveIntento = `${idGrupo}-${respuesta.id_alumno}-${respuesta.id_intento}`;

    if (!intentosMap.has(claveIntento)) {
      intentosMap.set(claveIntento, {
        idGrupo,
        idAlumno: respuesta.id_alumno,
        suma: 0,
        total: 0,
      });
    }

    const intento = intentosMap.get(claveIntento);
    intento.suma += Number(respuesta.puntaje || 0);
    intento.total += 1;
  });

  const mejoresPorGrupo = new Map();

  Array.from(intentosMap.values()).forEach((intento) => {
    const promedioIntento = intento.total > 0 ? intento.suma / intento.total : 0;

    if (!mejoresPorGrupo.has(intento.idGrupo)) {
      mejoresPorGrupo.set(intento.idGrupo, new Map());
    }

    const alumnosMap = mejoresPorGrupo.get(intento.idGrupo);
    const mejorActual = alumnosMap.get(intento.idAlumno) || 0;

    if (promedioIntento > mejorActual) {
      alumnosMap.set(intento.idAlumno, promedioIntento);
    }
  });

  return grupos.map((grupo) => {
    const alumnosMap = mejoresPorGrupo.get(grupo.id_grupo) || new Map();
    const mejores = Array.from(alumnosMap.values());

    const totalAlumnos = grupo.alumnos.length;
    const resueltos = mejores.length;

    const eficacia =
      resueltos > 0
        ? mejores.reduce((acc, valor) => acc + Number(valor || 0), 0) /
          resueltos
        : 0;

    return {
      id: grupo.id_grupo,
      nombre: grupo.nombre_grupo,
      turno: grupo.turno,
      asignado: grupo.ejercicios.length > 0,
      total_alumnos: totalAlumnos,
      resueltos,
      eficacia: Number(eficacia.toFixed(2)),
    };
  });
};