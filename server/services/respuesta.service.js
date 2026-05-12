import { randomUUID } from "crypto";
import * as repo from "../repo/respuesta.repo.js";
import { ApiError } from "../utils/errores.utils.js";
import { controlErrores } from "../utils/utilidad.utils.js";

function promedio(lista) {
  if (!lista || lista.length === 0) return 0;

  const suma = lista.reduce((acc, item) => {
    return acc + Number(item.puntaje || item.precision || 0);
  }, 0);

  return suma / lista.length;
}

async function resolverAlumnoPorIdIngreso(idIngreso) {
  const idLimpio = String(idIngreso || "").trim();

  if (!idLimpio) {
    throw new ApiError(
      "Falta el id de ingreso del alumno",
      400,
      "El ID del alumno es obligatorio",
    );
  }

  const alumno = await repo.obtenerAlumnoPorIdIngreso(idLimpio);

  if (!alumno) {
    throw new ApiError(
      "No se encontró el alumno",
      404,
      "No se encontró el alumno con ese ID",
    );
  }

  return alumno;
}

export const guardarIntento = async (data) => {
  try {
    const { idIngreso, idEjercicio, respuestas } = data;

    if (!idEjercicio) {
      throw new ApiError(
        "Falta el ejercicio",
        400,
        "No se recibió el ejercicio",
      );
    }

    if (!Array.isArray(respuestas) || respuestas.length === 0) {
      throw new ApiError(
        "Sin respuestas",
        400,
        "No hay respuestas para guardar",
      );
    }

    const alumno = await resolverAlumnoPorIdIngreso(idIngreso);

    const respuestasLimpias = respuestas
      .filter((r) => r?.silaba)
      .map((r) => ({
        silaba: String(r.silaba).trim(),
        puntaje: Number(r.puntaje || 0),
        trazo: r.trazo ?? null,
      }));

    if (respuestasLimpias.length === 0) {
      throw new ApiError(
        "Sin respuestas válidas",
        400,
        "No hay respuestas válidas para guardar",
      );
    }

    const idIntento = randomUUID();

    const guardado = await repo.guardarIntento(
      alumno.id_alumno,
      idEjercicio,
      idIntento,
      respuestasLimpias,
    );

    return {
      id_intento: idIntento,
      promedio: promedio(respuestasLimpias),
      guardadas: guardado?.count ?? respuestasLimpias.length,
    };
  } catch (error) {
    controlErrores(error);
  }
};

export const verResultadosAlumno = async ({ idAlumno }) => {
  try {
    const alumno = await resolverAlumnoPorIdIngreso(idAlumno);
    const respuestas = await repo.listarRespuestasAlumno(alumno.id_alumno);

    if (!respuestas || respuestas.length === 0) {
      return {
        alumno,
        eficacia_global: 0,
        ejercicios: [],
      };
    }

    const ejerciciosMap = new Map();

    respuestas.forEach((r) => {
      const idEjercicio = Number(r.id_ejercicio);

      if (!ejerciciosMap.has(idEjercicio)) {
        ejerciciosMap.set(idEjercicio, {
          id_ejercicio: idEjercicio,
          titulo: r.ejercicio?.titulo || `Ejercicio ${idEjercicio}`,
          intentos: new Map(),
        });
      }

      const ejercicio = ejerciciosMap.get(idEjercicio);

      if (!ejercicio.intentos.has(r.id_intento)) {
        ejercicio.intentos.set(r.id_intento, {
          id_intento: r.id_intento,
          fecha: r.fecha,
          respuestas: [],
        });
      }

      const intento = ejercicio.intentos.get(r.id_intento);
      intento.respuestas.push(r);

      if (new Date(r.fecha) > new Date(intento.fecha)) {
        intento.fecha = r.fecha;
      }
    });

    const ejercicios = Array.from(ejerciciosMap.values()).map((ej) => {
      const intentos = Array.from(ej.intentos.values()).map((intento) => ({
        id_intento: intento.id_intento,
        fecha: intento.fecha,
        promedio: promedio(intento.respuestas),
      }));

      const mejorIntento = intentos.reduce(
        (mejor, actual) => (actual.promedio > mejor.promedio ? actual : mejor),
        { promedio: 0 },
      );

      return {
        id_ejercicio: ej.id_ejercicio,
        titulo: ej.titulo,
        mejor_puntaje: mejorIntento.promedio,
        total_intentos: intentos.length,
        fecha_ultimo_intento: intentos
          .map((i) => i.fecha)
          .sort((a, b) => new Date(b) - new Date(a))[0],
      };
    });

    const eficaciaGlobal = promedio(
      ejercicios.map((e) => ({
        puntaje: e.mejor_puntaje,
      })),
    );

    return {
      alumno,
      eficacia_global: eficaciaGlobal,
      ejercicios,
    };
  } catch (error) {
    controlErrores(error);
  }
};

export const verResultadosAlumnoEjercicio = async ({
  idAlumno,
  idEjercicio,
}) => {
  try {
    const alumno = await resolverAlumnoPorIdIngreso(idAlumno);

    const respuestas = await repo.listarRespuestasAlumnoEjercicio(
      alumno.id_alumno,
      idEjercicio,
    );

    if (!respuestas || respuestas.length === 0) {
      return {
        id_ejercicio: Number(idEjercicio),
        mejor_puntaje: 0,
        silabas: [],
        intentos: [],
      };
    }

    const silabasMap = new Map();
    const intentosMap = new Map();

    respuestas.forEach((r) => {
      if (!silabasMap.has(r.silaba)) {
        silabasMap.set(r.silaba, {
          silaba: r.silaba,
          suma: 0,
          intentos: 0,
        });
      }

      const silaba = silabasMap.get(r.silaba);
      silaba.suma += Number(r.puntaje || 0);
      silaba.intentos += 1;

      if (!intentosMap.has(r.id_intento)) {
        intentosMap.set(r.id_intento, {
          id_intento: r.id_intento,
          fecha: r.fecha,
          respuestas: [],
        });
      }

      const intento = intentosMap.get(r.id_intento);
      intento.respuestas.push(r);

      if (new Date(r.fecha) > new Date(intento.fecha)) {
        intento.fecha = r.fecha;
      }
    });

    const silabas = Array.from(silabasMap.values()).map((s) => ({
      silaba: s.silaba,
      precision_promedio: s.suma / s.intentos,
      intentos: s.intentos,
    }));

    const intentos = Array.from(intentosMap.values())
      .map((i) => ({
        id_intento: i.id_intento,
        fecha: i.fecha,
        promedio: promedio(i.respuestas),
      }))
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const mejorPuntaje = intentos.reduce(
      (mejor, actual) => (actual.promedio > mejor ? actual.promedio : mejor),
      0,
    );

    return {
      id_ejercicio: Number(idEjercicio),
      mejor_puntaje: mejorPuntaje,
      silabas,
      intentos,
    };
  } catch (error) {
    controlErrores(error);
  }
};

export const verSilabasDificiles = async ({ idAlumno }) => {
  try {
    const alumno = await resolverAlumnoPorIdIngreso(idAlumno);
    const silabas = await repo.silabasDificiles(alumno.id_alumno, 4);

    return {
      alumno,
      silabas,
    };
  } catch (error) {
    controlErrores(error);
  }
};