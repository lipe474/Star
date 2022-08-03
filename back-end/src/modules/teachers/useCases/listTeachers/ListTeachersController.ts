import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTeachersUseCase } from "./ListTeachersUseCase";

class ListTeachersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTeachersUseCase = container.resolve(ListTeachersUseCase);

    const all = await listTeachersUseCase.execute();

    return response.json(all);
  }
}

export { ListTeachersController };
