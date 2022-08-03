import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetMedicByIdUseCase } from "./GetMedicByIdUseCase";

class GetMedicByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getMedicByIdUseCase = container.resolve(GetMedicByIdUseCase);

    const medic = await getMedicByIdUseCase.execute(id);

    return response.json(medic);
  }
}

export { GetMedicByIdController };
