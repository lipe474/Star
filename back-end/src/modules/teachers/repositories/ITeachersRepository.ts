import { ICreateTeacherDTO } from "../dtos/ICreateTeacherDTO";
import { IUpdateTeacherDTO } from "../dtos/IUpdateTeacherDTO";
import { Teacher } from "../infra/typeorm/entities/Teacher";

interface ITeachersRepository {
  create(data: ICreateTeacherDTO): Promise<Teacher>;
  updateTeacher(id: string, data: IUpdateTeacherDTO): Promise<Teacher>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Teacher[]>;
  findById(id: string): Promise<Teacher>;
  findByCpf(cpf: string): Promise<Teacher>;
  findByCrm(crm: string): Promise<Teacher>;
}

export { ITeachersRepository };
