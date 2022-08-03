import { inject, injectable } from "tsyringe";
import { Exam } from "@modules/exams/infra/typeorm/entities/Exam";
import { IExamsRepository } from "@modules/exams/repositories/IExamsRepository";

@injectable()
class GetExamByIdUseCase {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: IExamsRepository
  ) {}

  async execute(id: string): Promise<Exam> {
    const exam = await this.examsRepository.findById(id);
    return exam;
  }
}

export { GetExamByIdUseCase };
