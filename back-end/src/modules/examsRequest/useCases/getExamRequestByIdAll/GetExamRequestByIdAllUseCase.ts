import { ExamRequest } from "@modules/examsRequest/infra/typeorm/entities/ExamRequest";
import { ExamsRequestRepository } from "@modules/examsRequest/infra/typeorm/repositories/ExamsRequestRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetExamRequestByIdAllUseCase {
  constructor(
    @inject("ExamsRequestRepository")
    private examsRequestRepository: ExamsRequestRepository
  ) {}

  async execute(id: string): Promise<ExamRequest[]> {
    return this.examsRequestRepository.findByIdAll(id);
  }
}

export { GetExamRequestByIdAllUseCase };
