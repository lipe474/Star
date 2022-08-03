import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetResidentByIdUseCase } from "./GetResidentByIdUseCase";

class GetResidentByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getResidentByIdUseCase = container.resolve(GetResidentByIdUseCase);

    const resident = await getResidentByIdUseCase.execute(id);

    return response.json(resident);
  }
}

export { GetResidentByIdController };
