import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTeacherUseCase } from "./DeleteTeacherUseCase";

class DeleteTeacherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTeacherUseCase = container.resolve(DeleteTeacherUseCase);

    await deleteTeacherUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteTeacherController };
