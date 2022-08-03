import { inject, injectable } from "tsyringe";
import { ExamsRepository } from "@modules/exams/infra/typeorm/repositories/ExamRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteExamUseCase {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: ExamsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const exam = await this.examsRepository.findById(id);

    if (!exam) {
      throw new AppError("Exam does not exists!");
    }

    await this.examsRepository.delete(id);
  }
}

export { DeleteExamUseCase };
