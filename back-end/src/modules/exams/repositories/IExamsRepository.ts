import { ICreateExamDTO } from "../dtos/ICreateExamDTO";
import { IUpdateExamDTO } from "../dtos/IUpdateExamDTO";
import { Exam } from "../infra/typeorm/entities/Exam";

interface IExamsRepository {
  create(data: ICreateExamDTO): Promise<Exam>;
  updateExam(id: string, data: IUpdateExamDTO): Promise<Exam>;
  updateExamAttachment(attachment: string): Promise<String>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Exam>;
  findByIdAll(id: string): Promise<Exam[]>;
}

export { IExamsRepository };
