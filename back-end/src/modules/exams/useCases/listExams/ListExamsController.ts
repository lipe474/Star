import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListExamsUseCase } from "./ListExamsUseCase";

class ListExamsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listExamsUseCase = container.resolve(ListExamsUseCase);

    const all = await listExamsUseCase.execute();

    return response.json(all);
  }
}

export { ListExamsController };
