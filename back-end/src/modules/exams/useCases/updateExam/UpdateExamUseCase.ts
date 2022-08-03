import { inject, injectable } from "tsyringe";
import { Exam } from "@modules/exams/infra/typeorm/entities/Exam";
import { IExamsRepository } from "@modules/exams/repositories/IExamsRepository";
import { IUpdateExamDTO } from "@modules/exams/dtos/IUpdateExamDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateExamUseCase {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: IExamsRepository
  ) {}

  async execute(id: string, data: IUpdateExamDTO): Promise<Exam> {
    const exam = await this.examsRepository.findById(id);

    if (!exam) {
      throw new AppError("Exam does not exists!");
    }

    data = {
      id: id,
      name: data.name,
      date: data.date,
      attachment: exam.attachment,
      report: data.report,
      status: data.status,
    };

    await this.examsRepository.updateExam(id, data);
    return exam;
  }
}

export { UpdateExamUseCase };
