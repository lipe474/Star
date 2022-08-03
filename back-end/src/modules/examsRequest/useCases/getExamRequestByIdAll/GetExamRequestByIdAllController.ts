import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetExamRequestByIdAllUseCase } from "./GetExamRequestByIdAllUseCase";

class GetExamRequestByIdAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getExamRequestByIdAllUseCase = container.resolve(
      GetExamRequestByIdAllUseCase
    );

    const examRequest = await getExamRequestByIdAllUseCase.execute(id);

    return response.json(examRequest);
  }
}

export { GetExamRequestByIdAllController };
