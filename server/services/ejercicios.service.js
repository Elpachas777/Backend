import * as repo from "../repo/ejercicios.repo.js";
import { controlErrores, peticionVacia } from "../utils/utilidad.utils.js";

export const guardarEjercicio = async (data, id) => {
  try {
    const json = JSON.parse(data);
    await repo.crearEjercicio(json, id);
  } catch (error) {
    controlErrores(error);
  }
};

export const actualizar = async (id, data) => {
  try {
    const json = JSON.parse(data);
    const actualizado = await repo.actualizar(id, json);
    peticionVacia(actualizado, "No se puedo actualizar el ejercicio");
  } catch (error) {
    controlErrores(error);
  }
};

export const listarTipos = async () => {
  try {
    const tipos = await repo.listarTipos();
    peticionVacia(tipos, "No se pudieron obtener los tipos de ejercicios");
    return tipos;
  } catch (error) {
    controlErrores(error);
  }
};

export const listar = async (id) => {
  try {
    const ejercicios = await repo.listar(id);
    peticionVacia(ejercicios, "No se pudieron obtener los ejercicios");
    return ejercicios;
  } catch (error) {
    controlErrores(error);
  }
};

export const eliminar = async (id) => {
  try {
    const eliminar = await repo.eliminar(id);
    peticionVacia(eliminar, "No se pudo eliminar el ejercicio");
  } catch (error) {
    controlErrores(error);
  }
};

export const asignar = async (id, data) => {
  try {
    const asignado = await repo.asignar(id, data.id)
    peticionVacia(asignado, "No se pudo asignar el ejercicio al grupo")
  } catch (error) {
    controlErrores(error)
  }
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
          id_ingreso: true,
          usuario: {
            select: {
              nombres: true,
              apellido: true,
            },
          },
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

    // Detalle alumno por alumno: quién resolvió y quién no.
    const alumnosDetalle = grupo.alumnos.map((alumno) => {
      const mejorPuntaje = alumnosMap.get(alumno.id_alumno);
      const nombres = alumno.usuario?.nombres || "";
      const apellido = alumno.usuario?.apellido || "";
      const nombreCompleto = [nombres, apellido].filter(Boolean).join(" ").trim();

      return {
        id_alumno: alumno.id_alumno,
        id_ingreso: alumno.id_ingreso,
        nombre: nombreCompleto || `Alumno ${alumno.id_alumno}`,
        resuelto: mejorPuntaje !== undefined,
        mejor_puntaje:
          mejorPuntaje !== undefined ? Number(mejorPuntaje.toFixed(2)) : null,
      };
    });

    // Resueltos primero, dentro de cada grupo por mejor puntaje desc.
    alumnosDetalle.sort((a, b) => {
      if (a.resuelto !== b.resuelto) return a.resuelto ? -1 : 1;
      if (a.resuelto) return (b.mejor_puntaje || 0) - (a.mejor_puntaje || 0);
      return a.nombre.localeCompare(b.nombre);
    });

    return {
      id: grupo.id_grupo,
      nombre: grupo.nombre_grupo,
      turno: grupo.turno,
      asignado: grupo.ejercicios.length > 0,
      total_alumnos: totalAlumnos,
      resueltos,
      eficacia: Number(eficacia.toFixed(2)),
      alumnos: alumnosDetalle,
    };
  });
};