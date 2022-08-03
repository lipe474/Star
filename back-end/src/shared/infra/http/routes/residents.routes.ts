import { Router } from "express";
import { CreateResidentController } from "@modules/residents/useCases/createResident/CreateResidentController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListResidentsController } from "@modules/residents/useCases/listResident/ListResidentController";
import { DeleteResidentController } from "@modules/residents/useCases/deleteResident/DeleteResidentController";
import { UpdateResidentController } from "@modules/residents/useCases/updateResident/UpdateResidentController";
import { GetResidentByIdController } from "@modules/residents/useCases/getResidentById/GetResidentByIdController";

const residentsRoutes = Router();

const createResidentController = new CreateResidentController();
const listResidentsController = new ListResidentsController();
const deleteResidentController = new DeleteResidentController();
const updateResidentController = new UpdateResidentController();
const getResidentByIdController = new GetResidentByIdController();

residentsRoutes.post("/", ensureAuthenticated, createResidentController.handle);
residentsRoutes.get("/", ensureAuthenticated, listResidentsController.handle);
residentsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteResidentController.handle
);
residentsRoutes.put(
  "/:id",
  ensureAuthenticated,
  updateResidentController.handle
);
residentsRoutes.get(
  "/:id",
  ensureAuthenticated,
  getResidentByIdController.handle
);

export { residentsRoutes };
