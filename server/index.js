import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";

import { manejadorErrores } from "./middleware/error.middleware.js";
import adminRoutes from "./routes/admin.routes.js";
import alumnoRoutes from "./routes/alumno.routes.js";
import authRoutes from "./routes/auth.routes.js";
import docenteRoutes from "./routes/docente.routes.js";
import ejercicioRoutes from "./routes/ejercicio.routes.js";
import escuelaRoutes from "./routes/escuela.routes.js";
import gruposRoutes from "./routes/grupo.routes.js";
import indexRoutes from "./routes/index.routes.js";
import respuestaRoutes from "./routes/respuesta.routes.js";
import sesionRoutes from "./routes/sesion.routes.js";

const app = express();

const originsDesdeEnv = [
  process.env.URL_FRONT_END,
  process.env.FRONTEND_ORIGINS,
]
  .filter(Boolean)
  .flatMap((origenes) =>
    origenes
      .split(",")
      .map((origen) => origen.trim())
      .filter(Boolean),
  );

const allowedOrigins = new Set([
  ...originsDesdeEnv,

  // Frontend local Vite
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // Por si Vite cambia de puerto
  "http://localhost:5174",
  "http://127.0.0.1:5174",
]);

const corsOptions = {
  origin(origin, callback) {
    // Permite llamadas sin Origin, como curl, Postman o health checks
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    console.log("CORS bloqueado para origin:", origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(indexRoutes);
app.use(docenteRoutes);
app.use(alumnoRoutes);
app.use(gruposRoutes);
app.use(sesionRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(ejercicioRoutes);
app.use(escuelaRoutes);
app.use(respuestaRoutes);

app.use(manejadorErrores);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});