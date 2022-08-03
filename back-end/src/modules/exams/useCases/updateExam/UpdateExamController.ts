import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateExamUseCase } from "./UpdateExamUseCase";

class UpdateExamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { ...data } = request.body;

    const updateExamUseCase = container.resolve(UpdateExamUseCase);

    await updateExamUseCase.execute(id, data);

    return response.status(204).send();
  }
}

export { UpdateExamController };
