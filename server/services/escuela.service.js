import { consultarEscuelas } from "../repo/escuela.repo.js";
import { ApiError } from "../utils/errores.utils.js";

export const verInfoEscuelas = async () => {
    try {
        const escuelas = await consultarEscuelas()

        if (!escuelas) {
            throw new ApiError(
                "La petición devuelve un registro vacio",
                500,
                "No hay escuelas registradas",
            );
        }

        return escuelas
    } catch (error) {
        controlErrores(error);
    }
}