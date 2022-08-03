import { container } from "tsyringe";
import { GetExamByIdAllUseCase } from "./GetExamByIdAllUseCase";
import { Request, Response } from "express";

class GetExamByIdAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getExamByIdAllUseCase = container.resolve(GetExamByIdAllUseCase);

    const exams = await getExamByIdAllUseCase.execute(id);

    return response.json(exams);
  }
}

export { GetExamByIdAllController };
