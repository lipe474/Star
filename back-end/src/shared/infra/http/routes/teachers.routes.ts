import { Router } from "express";
import { CreateTeacherController } from "@modules/teachers/useCases/createTeacher/CreateTeacherController";
import { DeleteTeacherController } from "@modules/teachers/useCases/deleteTeacher/DeleteTeacherController";
import { ListTeachersController } from "@modules/teachers/useCases/listTeachers/ListTeachersController";
import { UpdateTeacherController } from "@modules/teachers/useCases/updateTeachers/UpdateTeacherController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { GetTeacherByIdController } from "@modules/teachers/useCases/getTeacherById/GetTeacherByIdController";

const teachersRoutes = Router();

const createTeacherController = new CreateTeacherController();
const listTeachersController = new ListTeachersController();
const deleteTeacherController = new DeleteTeacherController();
const updateTeacherController = new UpdateTeacherController();
const getTeacherByIdController = new GetTeacherByIdController();

teachersRoutes.post("/", ensureAuthenticated, createTeacherController.handle);
teachersRoutes.get("/", ensureAuthenticated, listTeachersController.handle);
teachersRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteTeacherController.handle
);
teachersRoutes.put("/:id", ensureAuthenticated, updateTeacherController.handle);
teachersRoutes.get(
  "/:id",
  ensureAuthenticated,
  getTeacherByIdController.handle
);

export { teachersRoutes };
