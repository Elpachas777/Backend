import { generarToken, objetoSesion } from "../auth/auth.js";
import { enviarCorreoContraseña } from "../services/correo.service.js";
import {
  correoRecuperarContraseña,
  login,
  modificarContraseña,
} from "../services/sesion.service.js";

export async function iniciarSesion(req, res, next) {
  try {
    const sesion = await login(req.body);
    console.log(sesion);
    const token = generarToken(sesion, "1h");
    console.log(token);

    return res.cookie("access_token", token, objetoSesion()).json(token);
  } catch (error) {
    next(error);
  }
}

export async function correoContraseña(req, res, next) {
  try {
    const info = await correoRecuperarContraseña(req.body);
    const token = generarToken(info, "15m");
    enviarCorreoContraseña(token);

    return res.status(200).json({
      tipo: "info",
      mensaje: "Siga las instrucciones que se acaban de enviar a su correo.",
    });
  } catch (error) {
    next(error);
  }
}

export async function recuperarContraseña(req, res, next) {
  try {
    await modificarContraseña(req.body);

    res.status(200).json({
      tipo: "success",
      mensaje: "Contraseña actualizada con exito.",
    });
  } catch (error) {
    next(error);
  }
}

export async function cerrarSesion(req, res, next) {
  try {
    return res.clearCookie("access_token", objetoSesion()).send("ok");
  } catch (error) {
    next(error);
  }
}
