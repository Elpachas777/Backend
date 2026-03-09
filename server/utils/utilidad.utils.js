import "dotenv/config";
import bcrypt from "bcrypt";
import { ApiError } from "./errores.utils.js";
import { consultarAdminPorCorreo } from "../repo/admin.repo.js";
import { consultarDocentePorCorreo, consultarDocentePorId } from "../repo/docente.repo.js";
import { consultarGrupoPorId } from "../repo/grupo.repo.js";

export function validarCampos(datos, requeridos) {
    const validados = {}

    for (const campo of requeridos) {
        const valor = (datos?.[campo] || "")

        if (!valor) {
            throw new ApiError("Campos incompletos", 400, "Algunos campos no cuentan con información")
        }

        validados[campo] = valor
    }

    return validados
}

export async function hashear(password) {
    try {
        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUND)
        );
        return passwordHash;
    } catch (error) {
        throw new ApiError(error.message, 400, "No se pudo hacer el hash de la contraseña")
    }
}

export async function validarContraseña(contraseña, contraseñaHash) {
    const valido = await bcrypt.compare(contraseña, contraseñaHash)

    if (!valido) {
        throw new ApiError("Las contraseñas no coinciden", 400, "Contraseña invalida");
    }
}

export async function remplazarContraseña(info) {
    return { ...info, password: await hashear(info.password) }
}

export function controlErrores(error) {
    if (error instanceof ApiError) {
        throw error
    }

    throw new ApiError(error.message, 500, "Ocurrió un error interno")
}

export async function correoRegistrado(correo) {
    const existeAdmin = await consultarAdminPorCorreo(correo);

    if (existeAdmin)
        throw new ApiError("El correo se registró en otro usuario", 400, "Correo registrado previamente");

    const existeDocente = await consultarDocentePorCorreo(correo);

    if (existeDocente)
        throw new ApiError("El correo se registró en otro usuario", 400, "Correo registrado previamente");

}

export async function alumnoId(id) {
    if (!consultarDocentePorId(id)) {
        throw new ApiError("La petición devuelve un registro vacio", 500, "No se encontró al alumno")
    }
}

export async function docenteId(id) {
    if (!consultarDocentePorId(id)) {
        throw new ApiError("La petición devuelve un registro vacio", 500, "No se encontró al docente")
    }
}

export async function grupoId(id) {
    if (!consultarGrupoPorId(id)) {
        throw new ApiError("La petición devuelve un registro vacio", 500, "No se encontró el grupo")
    }
}