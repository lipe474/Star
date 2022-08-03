import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListResidentsUseCase } from "./ListResidentUseCase";

class ListResidentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listResidentsUseCase = container.resolve(ListResidentsUseCase);

    const all = await listResidentsUseCase.execute();

    return response.json(all);
  }
}

export { ListResidentsController };
