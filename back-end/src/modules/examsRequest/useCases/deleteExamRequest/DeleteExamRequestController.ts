import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteExamRequestUseCase } from "./DeleteExamRequestUseCase";

class DeleteExamRequestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteExamRequestUseCase = container.resolve(
      DeleteExamRequestUseCase
    );

    await deleteExamRequestUseCase.execute({ id });

    return response.status(204).send();
  }
}

export { DeleteExamRequestController };
