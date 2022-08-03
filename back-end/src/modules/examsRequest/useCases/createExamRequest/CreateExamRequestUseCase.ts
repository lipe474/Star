import { inject, injectable } from "tsyringe";
import { ExamRequest } from "@modules/examsRequest/infra/typeorm/entities/ExamRequest";
import { IExamsRequestRepository } from "@modules/examsRequest/repositories/IExamsRequestRepository";
import { ICreateExamRequestDTO } from "@modules/examsRequest/dtos/ICreateExamRequestDTO";

@injectable()
class CreateExamRequestUseCase {
  constructor(
    @inject("ExamsRequestRepository")
    private examsRequestRepository: IExamsRequestRepository
  ) {}

  async execute({
    exams,
    diagnostic_hypothesis,
    date,
    patient_id,
  }: ICreateExamRequestDTO): Promise<ExamRequest> {
    const examRequest = await this.examsRequestRepository.create({
      exams,
      diagnostic_hypothesis,
      date,
      patient_id,
    });

    return examRequest;
  }
}

export { CreateExamRequestUseCase };
