import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateExamRequestUseCase } from "./UpdateExamRequestUseCase";

class UpdateExamRequestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { ...data } = request.body;

    const updateExamRequestUseCase = container.resolve(
      UpdateExamRequestUseCase
    );

    await updateExamRequestUseCase.execute(id, data);

    return response.status(204).send();
  }
}

export { UpdateExamRequestController };
