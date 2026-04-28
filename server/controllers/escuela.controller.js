import { verInfoEscuelas } from "../services/escuela.service.js";

export const verEscuelas = async (req, res, next) => {
    try {
        const escuelas = await verInfoEscuelas()
        return res.status(200).json(escuelas)
    } catch (error) {
        next(error);
    }
}