import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetExamByIdUseCase } from "./GetExamByIdUseCase";

class GetExamByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getExamByIdUseCase = container.resolve(GetExamByIdUseCase);

    const exam = await getExamByIdUseCase.execute(id);

    return response.json(exam);
  }
}

export { GetExamByIdController };
