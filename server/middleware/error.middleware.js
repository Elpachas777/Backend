export function manejadorErrores(err, req, res, next) {
  console.error(err.publicMessage + ": " + err.message);
  console.trace();
  return res.status(err.statusCode).json({
    tipo: "error",
    mensaje: err.publicMessage,
  });
}
