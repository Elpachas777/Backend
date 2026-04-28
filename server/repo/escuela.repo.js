import { prisma } from "../utils/db.utils.js";

export const consultarEscuelas = () => {
    return prisma.escuela.findMany({
        select:{
            id_escuela: true,
            nombre: true
        }
    })
} 