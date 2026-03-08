import "dotenv/config";
import { login } from "../services/sesion.service.js";
import jwt from "jsonwebtoken";
import sendEmail from "../mail.js";
import {
  actualizarContraseña,
  verPorCorreo,
} from "../services/docente.service.js";
import { consultarAdmin } from "../services/admin.service.js";

export const iniciarSesionDocente = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const sesion = await login(correo, password);

    if (sesion) {
      const token = jwt.sign({ sesion }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .send({ token });
    }
    res
      .status(400)
      .json({ tipo: "error", mensaje: "Credenciales incorrectas" });
  } catch (error) {
    return res.status(401).json({ tipo: "error", mensaje: error.message });
  }
};

export const correoContraseña = async (req, res) => {
  const { correo } = req.body;
  try {
    const admin = await consultarAdmin(correo);

    if (admin) {
      const token = jwt.sign(
        { id: admin.id_admin, correo: admin.correo, tipo: "recuperación" },
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );
      const pagina = `http://localhost:5173/RecuperarContraseña?token=${token}`;

      sendEmail(
        admin.correo,
        "Recuperación de contraseña",
        `<h1>Recuperación de contraseña</h1>
        <p>Haz clic en el enlace para restablecer tu contraseña:</p>
        <p><a href="${pagina}">Recuperar contraseña</a></p>`
      );

      return res.status(201).json({
        tipo: "info",
        mensaje: "Siga las instrucciones que se acaban de enviar a su correo.",
      });
    }

    const docente = await verPorCorreo(correo);

    if (docente) {
      const token = jwt.sign(
        {
          id: docente.id_docente,
          correo: docente.correo,
          tipo: "recuperación",
        },
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );

      const pagina = `http://localhost:5173/RecuperarContraseña?token=${token}`;

      sendEmail(
        docente.correo,
        "Recuperación de contraseña",
        `<h1>Recuperación de contraseña</h1>
        <p>Haz clic en el enlace para restablecer tu contraseña:</p>
        <p><a href="${pagina}">Recuperar contraseña</a></p>`
      );

      return res.status(201).json({
        tipo: "info",
        mensaje: "Siga las instrucciones que se acaban de enviar a su correo.",
      });
    }

    res
      .status(400)
      .json({ tipo: "error", mensaje: "El correo no se encuentra registrado" });
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: error.message });
  }
};

export const recuperarContraseña = async (req, res) => {
  const { token, password } = req.body;

  try {
    const datosToken = jwt.verify(token, process.env.SECRET_KEY);

    if (datosToken.tipo !== "recuperación")
      res.status(400).send("Token invalido");

    await actualizarContraseña(datosToken.correo, password);

    res
      .status(200)
      .json({ tipo: "success", mensaje: "Contraseña actualizada con exito." });
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: error.message });
  }
};

export const cerrarSesion = async (req, res) => {
  try {
    return res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .send("ok");
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: error.message });
  }
};
