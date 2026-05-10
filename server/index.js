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
import sesionRoutes from "./routes/sesion.routes.js";

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(indexRoutes);
app.use(docenteRoutes);
app.use(alumnoRoutes);
app.use(gruposRoutes);
app.use(sesionRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(ejercicioRoutes);
app.use(escuelaRoutes);

app.use(manejadorErrores);

app.listen(process.env.PORT);
