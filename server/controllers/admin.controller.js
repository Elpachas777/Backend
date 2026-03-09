import { crearAdmin } from "../services/admin.service.js";

export const registrarAdmin = async (req, res) => {
  console.log("a");
  try {
    const nuevoAdmin = await crearAdmin(req.body);
    if (!nuevoAdmin) res.status(401).send("No se pudo crear el administrador");

    res.status(200).send("ok");
  } catch (error) {
    res.status(400).send("Ocurrió un error");
  }
};
