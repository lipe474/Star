import { ICreateExamDTO } from "@modules/exams/dtos/ICreateExamDTO";
import { IUpdateExamDTO } from "@modules/exams/dtos/IUpdateExamDTO";
import { IExamsRepository } from "@modules/exams/repositories/IExamsRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { Exam } from "../entities/Exam";

class ExamsRepository implements IExamsRepository {
  private repository: Repository<Exam>;

  constructor() {
    this.repository = getRepository(Exam);
  }

  async create({
    name,
    date,
    attachment,
    report,
    status,
    examRequest_id,
  }: ICreateExamDTO): Promise<Exam> {
    const exam = this.repository.create({
      name,
      date,
      attachment,
      report,
      status,
      examRequest_id,
    });

    await this.repository.save(exam);
    return exam;
  }

  async updateExam(id: string, data: IUpdateExamDTO): Promise<Exam> {
    await this.repository.update(id, {
      name: data.name,
      date: data.date,
      attachment: data.attachment,
      report: data.report,
      status: data.status,
    });

    const exam = await this.repository.findOne({ id });
    return exam;
  }

  async updateExamAttachment(attachment: string): Promise<String> {
    return attachment;
  }

  async delete(id: string): Promise<void> {
    const exam = await this.repository.findOne({ id });

    if (!exam) {
      throw new AppError("Exam does not exist");
    }

    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Exam> {
    const exam = await this.repository.findOne({ id });
    return exam;
  }

  async findByIdAll(id: string): Promise<Exam[]> {
    const exam = await this.repository.find({
      where: { examRequest_id: id },
    });
    return exam;
  }
}

export { ExamsRepository };
