import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPatientsUseCase } from "./ListPatientsUseCase";

class ListPatientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPatientsUseCase = container.resolve(ListPatientsUseCase);

    const all = await listPatientsUseCase.execute();

    return response.json(all);
  }
}

export { ListPatientsController };
