import { container, inject, injectable } from "tsyringe";
import { Teacher } from "@modules/teachers/infra/typeorm/entities/Teacher";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { ICreateTeacherDTO } from "@modules/teachers/dtos/ICreateTeacherDTO";
import { hash } from "bcrypt";
import { ValidateCpfAndCrm } from "@shared/utils/ValidateCpfAndCrm";

@injectable()
class CreateTeacherUseCase {
  constructor(
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository
  ) {}
  async execute({
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
  }: ICreateTeacherDTO): Promise<Teacher> {
    const passwordHash = await hash(password, 8);

    const validateCpfAndCrm = container.resolve(ValidateCpfAndCrm);

    await validateCpfAndCrm.execute(crm, cpf);

    const teacher = await this.teachersRepository.create({
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
      titration,
      password: passwordHash,
      marital_status,
      birth_date,
      address,
      city,
      state,
      gender,
      especialization,
      phone_number,
    });
    return teacher;
  }
}

export { CreateTeacherUseCase };
