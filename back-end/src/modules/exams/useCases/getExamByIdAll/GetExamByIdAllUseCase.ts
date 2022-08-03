import { Exam } from "@modules/exams/infra/typeorm/entities/Exam";
import { ExamsRepository } from "@modules/exams/infra/typeorm/repositories/ExamRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetExamByIdAllUseCase {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: ExamsRepository
  ) {}

  async execute(id: string): Promise<Exam[]> {
    return this.examsRepository.findByIdAll(id);
  }
}

export { GetExamByIdAllUseCase };
