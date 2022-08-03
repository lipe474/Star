import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateResidentUseCase } from "./UpdateResidentUseCase";

class UpdateResidentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { ...data } = request.body;

    const updateResidentUseCase = container.resolve(UpdateResidentUseCase);

    await updateResidentUseCase.execute(id, data);

    return response.status(204).send();
  }
}

export { UpdateResidentController };
