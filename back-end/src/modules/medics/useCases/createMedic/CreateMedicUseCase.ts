import { container, inject, injectable } from "tsyringe";
import { Medic } from "@modules/medics/infra/typeorm/entities/Medic";
import { IMedicsRepository } from "@modules/medics/repositories/IMedicsRepository";
import { ICreateMedicDTO } from "@modules/medics/dtos/ICreateMedicDTO";
import { hash } from "bcrypt";
import { ValidateCpfAndCrm } from "@shared/utils/ValidateCpfAndCrm";

@injectable()
class CreateMedicUseCase {
  constructor(
    @inject("MedicsRepository")
    private medicsRepository: IMedicsRepository
  ) {}

  async execute({
    name,
    nationality,
    ethnicity,
    crm,
    cpf,
    password,
    marital_status,
    birth_date,
    address,
    city,
    state,
    gender,
    especialization,
    phone_number,
  }: ICreateMedicDTO): Promise<Medic> {
    const passwordHash = await hash(password, 8);

    const validateCpfAndCrm = container.resolve(ValidateCpfAndCrm);

    await validateCpfAndCrm.execute(crm, cpf);

    const medic = await this.medicsRepository.create({
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
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
    return medic;
  }
}

export { CreateMedicUseCase };
