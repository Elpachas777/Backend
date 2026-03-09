import { prisma } from "../utils/db.utils.js"

export const consultarDocentePorId = (id) => {
    return prisma.docente.findUnique({
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
}

export const consultarDocentePorCorreo = (correo) => {
    return prisma.docente.findUnique({
        where: {
            correo: correo,
        },
    });
}

export const crearDocente = ({ correo, password, escuela, nombres, apellidos }) => {
    return prisma.docente.create({
        data: {
            correo: correo,
            contraseña: password,
            escuela: escuela,
            usuario: {
                create: {
                    nombres: nombres,
                    apellido: apellidos,
                },
            },
        },
        include: {
            usuario: true,
        },
    });
}

export const validarCorreo = (id) => {
    return prisma.docente.update({
        where: {
            id_docente: id,
        },
        data: {
            autorizado: true,
        },
    });
}

export const consultarDocentes = () => {
    return prisma.docente.findMany({
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
}

export const editarDocente = ({ id, escuela, nombres, apellidos }) => {
    return prisma.docente.update({
        where: {
            id_docente: Number(id),
        },
        data: {
            escuela: escuela,
            usuario: {
                update: {
                    nombres: nombres,
                    apellido: apellidos,
                },
            },
        },
        include: {
            usuario: true,
        },
    });
}

export const eliminarDocenteId = (id) => {
    return prisma.docente.delete({
        where: {
            id_docente: Number(id),
        },
    });
}

export const modificarContraseñaDocente = (correo, passwordHash) => {
    return prisma.administrador.update({
        where: {
            correo: correo,
        },
        data: {
            contraseña: passwordHash,
        },
    });
}