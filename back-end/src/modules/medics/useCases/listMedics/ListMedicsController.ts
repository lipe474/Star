import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMedicsUseCase } from "./ListMedicsUseCase";

class ListMedicsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMedicsUseCase = container.resolve(ListMedicsUseCase);

    const all = await listMedicsUseCase.execute();

    return response.json(all);
  }
}

export { ListMedicsController };
