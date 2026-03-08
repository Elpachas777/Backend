import sendEmail from "../mail.js";
import {
  editar,
  eliminar,
  modificarVerificado,
  registrar,
  verPorId,
  verTodos,
} from "../services/docente.service.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registarDocente = async (req, res) => {
  const datos = req.body;

  try {
    const docente = await registrar({ datos });

    const tokenVerificacion = jwt.sign(
      { id: docente.id_docente, correo: docente.correo, tipo: "verificación" },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const pagina = `http://localhost:4000/verificar?token=${tokenVerificacion}`;

    sendEmail(
      docente.correo,
      "Confirmación de correo",
      ` <h1>Hola, ${datos.nombres}</h1>
        <p>Gracias por registrarte. Haz clic para confirmar tu correo:</p>
        <p><a href="${pagina}">Confirmar correo</a></p>`
    );

    res.status(201).json({
      tipo: "success",
      mensaje:
        "Docente registrado con exito, favor de revisar el correo enviado.",
    });
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: error.message });
  }
};

export const verificarDocente = async (req, res) => {
  const { token } = req.query;

  try {
    const datosToken = jwt.verify(token, process.env.SECRET_KEY);

    if (datosToken.tipo !== "verificación")
      res.status(400).send("Token invalido");

    await modificarVerificado(datosToken.id, datosToken.correo);

    res
      .status(201)
      .json({ tipo: "info", mensaje: "Correo verificado con exito" });
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: error.message });
  }
};

export const verDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const docente = await verPorId(id);
    res.status(201).json(docente);
  } catch (error) {
    res.json({ tipo: "error", mensaje: error.message });
  }
};

export const verDocentes = async (req, res) => {
  try {
    const docentes = await verTodos();
    res.status(200).json(docentes);
  } catch (error) {
    res.status(400).json({ tipo: "error", mensaje: error.message });
  }
};

export const editarDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await editar(id, datos);

    return res
      .status(200)
      .json({ tipo: "info", mensaje: "Usuario editado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo editar al docente" });
  }
};

export const eliminarDocente = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminar(id);
    return res
      .status(202)
      .json({ tipo: "info", mensaje: "Docente eliminado con exito" });
  } catch (error) {
    res
      .status(400)
      .json({ tipo: "error", mensaje: "No se pudo eliminar al docente" });
  }
};
