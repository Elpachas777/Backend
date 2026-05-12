import { prisma } from "../utils/db.utils.js";

/**
 * Guarda múltiples respuestas en una sola transacción (un intento completo).
 * datos = [{ silaba, puntaje, trazo? }]
 */
export const guardarIntento = (id_alumno, id_ejercicio, id_intento, datos) => {
  const filas = datos.map((r) => ({
    id_alumno: Number(id_alumno),
    id_ejercicio: Number(id_ejercicio),
    id_intento: id_intento,
    silaba: r.silaba,
    puntaje: Number(r.puntaje),
    trazo: r.trazo ?? null,
  }));

  return prisma.respuesta.createMany({
    data: filas,
  });
};

/**
 * Devuelve, por cada intento, el promedio de puntaje del alumno en ese ejercicio.
 * Útil para luego elegir el "mejor intento histórico".
 */
export const promediosPorIntento = (id_alumno, id_ejercicio) => {
  return prisma.respuesta.groupBy({
    by: ["id_intento"],
    where: {
      id_alumno: Number(id_alumno),
      id_ejercicio: Number(id_ejercicio),
    },
    _avg: { puntaje: true },
    _max: { fecha: true },
  });
};

/**
 * Promedio por ejercicio de TODOS los intentos del alumno (más rápido que
 * pedir mejor intento, sirve cuando solo queremos algo agregado por ejercicio).
 */
export const promediosPorEjercicio = (id_alumno) => {
  return prisma.respuesta.groupBy({
    by: ["id_ejercicio"],
    where: { id_alumno: Number(id_alumno) },
    _avg: { puntaje: true },
    _count: { _all: true },
  });
};

/**
 * Trae todas las respuestas de un alumno con info mínima del ejercicio.
 * Útil para calcular "mejor intento histórico" en JS de forma flexible.
 */
export const listarRespuestasAlumno = (id_alumno) => {
  return prisma.respuesta.findMany({
    where: { id_alumno: Number(id_alumno) },
    select: {
      id_respuesta: true,
      silaba: true,
      puntaje: true,
      fecha: true,
      id_intento: true,
      id_ejercicio: true,
      ejercicio: {
        select: {
          id_ejercicio: true,
          titulo: true,
        },
      },
    },
    orderBy: { fecha: "asc" },
  });
};

/**
 * Respuestas de un alumno para UN ejercicio específico (todos los intentos).
 */
export const listarRespuestasAlumnoEjercicio = (id_alumno, id_ejercicio) => {
  return prisma.respuesta.findMany({
    where: {
      id_alumno: Number(id_alumno),
      id_ejercicio: Number(id_ejercicio),
    },
    select: {
      id_respuesta: true,
      silaba: true,
      puntaje: true,
      fecha: true,
      id_intento: true,
    },
    orderBy: { fecha: "asc" },
  });
};

/**
 * Top N sílabas con menor precisión promedio para un alumno.
 */
export const silabasDificiles = async (id_alumno, limite = 4) => {
  const agrupado = await prisma.respuesta.groupBy({
    by: ["silaba"],
    where: { id_alumno: Number(id_alumno) },
    _avg: { puntaje: true },
    _count: { _all: true },
  });

  return agrupado
    .map((r) => ({
      silaba: r.silaba,
      precision: r._avg.puntaje ?? 0,
      intentos: r._count._all,
    }))
    .sort((a, b) => a.precision - b.precision)
    .slice(0, limite);
};

/**
 * Resuelve id_alumno (numérico) a partir de id_ingreso (string "CM5CM33").
 */
export const obtenerAlumnoPorIdIngreso = (id_ingreso) => {
  return prisma.alumno.findFirst({
    where: { id_ingreso: String(id_ingreso).trim() },
    select: {
      id_alumno: true,
      id_ingreso: true,
      usuario: {
        select: { nombres: true, apellido: true },
      },
    },
  });
};