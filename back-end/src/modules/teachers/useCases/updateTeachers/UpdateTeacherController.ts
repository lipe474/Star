import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTeacherUseCase } from "./UpdateTeacherUseCase";

class UpdateTeacherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { ...data } = request.body;

    const updateTeacherUseCase = container.resolve(UpdateTeacherUseCase);

    await updateTeacherUseCase.execute(id, data);

    return response.status(204).send();
  }
}

export { UpdateTeacherController };
