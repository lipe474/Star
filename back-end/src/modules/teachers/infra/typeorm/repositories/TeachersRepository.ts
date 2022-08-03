import { ICreateTeacherDTO } from "@modules/teachers/dtos/ICreateTeacherDTO";
import { IUpdateTeacherDTO } from "@modules/teachers/dtos/IUpdateTeacherDTO";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { Teacher } from "../entities/Teacher";

class TeachersRepository implements ITeachersRepository {
  private repository: Repository<Teacher>;

  constructor() {
    this.repository = getRepository(Teacher);
  }

  async create({
    name,
    nationality,
    ethnicity,
    crm,
    cpf,
    titration,
    password,
    marital_status,
    birth_date,
    address,
    city,
    state,
    gender,
    especialization,
    phone_number,
    id,
  }: ICreateTeacherDTO): Promise<Teacher> {
    const teacher = this.repository.create({
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
      titration,
      password,
      marital_status,
      birth_date,
      address,
      city,
      state,
      gender,
      especialization,
      phone_number,
      id,
    });
    await this.repository.save(teacher);
    return teacher;
  }

  async updateTeacher(id: string, data: IUpdateTeacherDTO): Promise<Teacher> {
    await this.repository.update(id, {
      name: data.name,
      nationality: data.nationality,
      ethnicity: data.ethnicity,
      crm: data.crm,
      cpf: data.cpf,
      titration: data.titration,
      password: data.password,
      marital_status: data.marital_status,
      birth_date: data.birth_date,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      especialization: data.especialization,
      phone_number: data.phone_number,
    });
    const teacher = await this.repository.findOne({ id });
    return teacher;
  }

  async delete(id: string): Promise<void> {
    const teacher = await this.repository.findOne({ id });

    if (!teacher) {
      throw new AppError("Teacher does not exist");
    }

    await this.repository.delete(id);
  }

  async getAll(): Promise<Teacher[]> {
    const teachers = await this.repository.find({
      select: [
        "id",
        "name",
        "nationality",
        "ethnicity",
        "crm",
        "cpf",
        "titration",
        "marital_status",
        "birth_date",
        "address",
        "city",
        "state",
        "gender",
        "especialization",
        "phone_number",
      ],
    });
    return teachers;
  }

  async findById(id: string): Promise<Teacher> {
    const teacher = await this.repository.findOne({ id });
    return teacher;
  }

  async findByCpf(cpf: string): Promise<Teacher> {
    const teacher = await this.repository.findOne({ cpf });
    return teacher;
  }

  async findByCrm(crm: string): Promise<Teacher> {
    const teacher = await this.repository.findOne({ crm });
    return teacher;
  }
}

export { TeachersRepository };
