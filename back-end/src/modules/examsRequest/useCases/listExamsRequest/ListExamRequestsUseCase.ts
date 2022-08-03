import { inject, injectable } from "tsyringe";
import { ExamRequest } from "@modules/examsRequest/infra/typeorm/entities/ExamRequest";
import { IExamsRequestRepository } from "@modules/examsRequest/repositories/IExamsRequestRepository";

@injectable()
class ListExamRequestUseCase {
  constructor(
    @inject("ExamsRequestRepository")
    private examsRequestRepository: IExamsRequestRepository
  ) {}

  async execute(): Promise<ExamRequest[]> {
    const examsRequest = await this.examsRequestRepository.getAll();
    return examsRequest;
  }
}

export { ListExamRequestUseCase };
