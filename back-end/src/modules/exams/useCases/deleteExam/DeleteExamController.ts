import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteExamUseCase } from "./DeleteExamUseCase";

class DeleteExamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteExamUseCase = container.resolve(DeleteExamUseCase);

    await deleteExamUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteExamController };
