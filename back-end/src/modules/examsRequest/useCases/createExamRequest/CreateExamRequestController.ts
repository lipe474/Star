import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateExamRequestUseCase } from "./CreateExamRequestUseCase";

class CreateExamRequestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { exams, diagnostic_hypothesis, date, patient_id } = request.body;

    const createExamRequestUseCase = container.resolve(
      CreateExamRequestUseCase
    );

    await createExamRequestUseCase.execute({
      exams,
      diagnostic_hypothesis,
      date,
      patient_id,
    });

    return response.status(201).send();
  }
}

export { CreateExamRequestController };
