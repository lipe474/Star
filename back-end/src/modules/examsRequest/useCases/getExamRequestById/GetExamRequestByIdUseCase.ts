import { inject, injectable } from "tsyringe";
import { ExamRequest } from "@modules/examsRequest/infra/typeorm/entities/ExamRequest";
import { IExamsRequestRepository } from "@modules/examsRequest/repositories/IExamsRequestRepository";

@injectable()
class GetExamRequestByIdUseCase {
  constructor(
    @inject("ExamsRequestRepository")
    private examsRequestRepository: IExamsRequestRepository
  ) {}

  async execute(id: string): Promise<ExamRequest> {
    const examRequest = await this.examsRequestRepository.findById(id);
    return examRequest;
  }
}

export { GetExamRequestByIdUseCase };
