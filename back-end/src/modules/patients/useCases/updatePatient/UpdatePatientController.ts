import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

class UpdatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { ...data } = request.body;

    const updatePatientUseCase = container.resolve(UpdatePatientUseCase);

    await updatePatientUseCase.execute(id, data);

    return response.status(204).send();
  }
}

export { UpdatePatientController };
