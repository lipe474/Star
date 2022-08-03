import { container, inject, injectable } from "tsyringe";
import { Resident } from "@modules/residents/infra/typeorm/entities/Resident";
import { IResidentsRepository } from "@modules/residents/repositories/IResidentsRepository";
import { IUpdateResidentDTO } from "@modules/residents/dtos/IUpdateResidentDTO";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/AppError";
import { ValidateCpfAndCrmUpdate } from "@shared/utils/ValidateCpfAndCrmUpdate";

@injectable()
class UpdateResidentUseCase {
  constructor(
    @inject("ResidentsRepository")
    private residentsRepository: IResidentsRepository
  ) {}

  async execute(id: string, data: IUpdateResidentDTO): Promise<Resident> {
    const passwordHash = await hash(data.password, 8);

    const resident = await this.residentsRepository.findById(id);
    if (!resident) {
      throw new AppError("Resident does not exists!");
    }

    const validateCpfAndCrmUpdate = container.resolve(ValidateCpfAndCrmUpdate);

    await validateCpfAndCrmUpdate.execute(data.crm, data.cpf, id);

    data = {
      id: id,
      name: data?.name,
      ethnicity: data?.ethnicity,
      nationality: data?.nationality,
      crm: data?.crm,
      cpf: data?.cpf,
      residence_date: data?.residence_date,
      password: passwordHash,
      marital_status: data?.marital_status,
      birth_date: data?.birth_date,
      address: data?.address,
      city: data?.city,
      state: data?.state,
      gender: data?.gender,
      especialization: data?.especialization,
      phone_number: data?.phone_number,
    };

    await this.residentsRepository.updateResident(id, data);
    return resident;
  }
}

export { UpdateResidentUseCase };
