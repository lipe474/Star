import { inject, injectable } from "tsyringe";
import { IExamsRequestRepository } from "@modules/examsRequest/repositories/IExamsRequestRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteExamRequestUseCase {
  constructor(
    @inject("ExamsRequestRepository")
    private examsRequestRepository: IExamsRequestRepository
  ) {}

  async execute({ id }: { id: string }) {
    const examRequest = await this.examsRequestRepository.findById(id);

    if (!examRequest) {
      throw new AppError("Exam request does not exists!");
    }

    await this.examsRequestRepository.delete(id);
  }
}

export { DeleteExamRequestUseCase };
