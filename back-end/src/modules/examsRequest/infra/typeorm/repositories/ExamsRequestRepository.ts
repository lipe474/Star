import { ICreateExamRequestDTO } from "@modules/examsRequest/dtos/ICreateExamRequestDTO";
import { IUpdateExamRequestDTO } from "@modules/examsRequest/dtos/IUpdateExamRequestDTO";
import { IExamsRequestRepository } from "@modules/examsRequest/repositories/IExamsRequestRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { ExamRequest } from "../entities/ExamRequest";

class ExamsRequestRepository implements IExamsRequestRepository {
  private repository: Repository<ExamRequest>;

  constructor() {
    this.repository = getRepository(ExamRequest);
  }

  async create({
    exams,
    diagnostic_hypothesis,
    date,
    patient_id,
  }: ICreateExamRequestDTO): Promise<ExamRequest> {
    const examRequest = this.repository.create({
      exams,
      diagnostic_hypothesis,
      date,
      patient_id,
    });

    await this.repository.save(examRequest);
    return examRequest;
  }

  async updateExamRequest(
    id: string,
    data: IUpdateExamRequestDTO
  ): Promise<ExamRequest> {
    await this.repository.update(id, {
      exams: data.exams,
      diagnostic_hypothesis: data.diagnostic_hypothesis,
      date: data.date,
    });

    const examRequest = await this.repository.findOne({ id });
    return examRequest;
  }

  async delete(id: string): Promise<void> {
    const examRequest = await this.repository.findOne({ id });

    if (!examRequest) {
      throw new AppError("Exam request does not exist");
    }

    await this.repository.delete(id);
  }

  async findById(id: string): Promise<ExamRequest> {
    const examRequest = await this.repository.findOne({ id });
    return examRequest;
  }

  async findByIdAll(id: string): Promise<ExamRequest[]> {
    const examRequest = await this.repository.find({
      where: { patient_id: id },
    });
    return examRequest;
  }
}

export { ExamsRequestRepository };
