import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteResidentUseCase } from "./DeleteResidentUseCase";

class DeleteResidentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteResidentUseCase = container.resolve(DeleteResidentUseCase);

    await deleteResidentUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteResidentController };
