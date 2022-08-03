import { Router } from "express";
import "reflect-metadata";
import { authenticateRoutes } from "./authenticate.routes";
import { examsRoutes } from "./exams.routes";
import { examRequestsRoutes } from "./examsRequest.routes";
import { medicsRoutes } from "./medics.routes";
import { residentsRoutes } from "./residents.routes";
import { teachersRoutes } from "./teachers.routes";
import { patientsRoutes } from "./patients.routes";

const router = Router();

router.use("/patients", patientsRoutes);
router.use("/medics", medicsRoutes);
router.use("/residents", residentsRoutes);
router.use("/teachers", teachersRoutes);
router.use("/exams", examsRoutes);
router.use("/examRequests", examRequestsRoutes);
router.use(authenticateRoutes);

export { router };
