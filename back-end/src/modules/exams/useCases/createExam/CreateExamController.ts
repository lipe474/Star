import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateExamUseCase } from "./CreateExamUseCase";

class CreateExamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, date, attachment, report, status, examRequest_id } =
      request.body;

    const createExamUseCase = container.resolve(CreateExamUseCase);

    await createExamUseCase.execute({
      name,
      date,
      attachment,
      report,
      status,
      examRequest_id,
    });

    return response.status(201).send();
  }
}

export { CreateExamController };
