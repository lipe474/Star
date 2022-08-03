import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetExamRequestByIdUseCase } from "./GetExamRequestByIdUseCase";

class GetExamRequestByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getExamRequestByIdUseCase = container.resolve(
      GetExamRequestByIdUseCase
    );

    const examRequest = await getExamRequestByIdUseCase.execute(id);

    return response.json(examRequest);
  }
}

export { GetExamRequestByIdController };
