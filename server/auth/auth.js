import "dotenv/config";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).send("Token inexistente");

    const tokenDatos = jwt.verify(token, process.env.SECRET_KEY);
    req.user = tokenDatos;
    next();
  } catch (error) {
    return res.status(401).send("Token invalido o expirado");
  }
};
