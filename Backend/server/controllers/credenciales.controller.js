import "dotenv/config";
import jwt from "jsonwebtoken";

export const obtenerCredencial = async (req, res) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).send("Token inexistente");

    const tokenDatos = jwt.verify(token, process.env.SECRET_KEY);

    return res.status(200).send(tokenDatos.sesion.rol);
  } catch (error) {
    return res.status(401).send("Token invalido o expirado");
  }
};
