import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPatientByIdUseCase } from "./GetPatientByIdUseCase";

class GetPatientByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPatientByIdUseCase = container.resolve(GetPatientByIdUseCase);

    const patient = await getPatientByIdUseCase.execute(id);

    return response.json(patient);
  }
}

export { GetPatientByIdController };
