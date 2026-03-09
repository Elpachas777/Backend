import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import indexRoutes from "./routes/index.routes.js";
import docenteRoutes from "./routes/docente.routes.js";
import alumnoRoutes from "./routes/alumno.routes.js";
import gruposRoutes from "./routes/grupo.route.js";
import sesionRoutes from "./routes/sesion.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import {manejadorErrores} from "./middleware/error.middleware.js"


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(indexRoutes);
app.use(docenteRoutes);
app.use(alumnoRoutes);
app.use(gruposRoutes);
app.use(sesionRoutes);
app.use(authRoutes);
app.use(adminRoutes);

app.use(manejadorErrores)

app.listen(process.env.PORT);
