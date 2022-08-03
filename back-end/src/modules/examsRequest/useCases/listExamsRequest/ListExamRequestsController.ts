import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListExamRequestUseCase } from "./ListExamRequestsUseCase";

class ListExamRequestsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listExamRequestsUseCase = container.resolve(ListExamRequestUseCase);

    const all = await listExamRequestsUseCase.execute();

    return response.json(all);
  }
}

export { ListExamRequestsController };
