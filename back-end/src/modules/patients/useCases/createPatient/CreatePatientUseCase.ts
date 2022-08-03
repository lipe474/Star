import { inject, injectable } from "tsyringe";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  ethnicity?: string;
  nationality?: string;
  cpf: string;
  birth_date: Date;
  marital_status?: string;
  address?: string;
  state?: string;
  city?: string;
  gender: string;
  phone_number?: string;
}

@injectable()
class CreatePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute({
    name,
    ethnicity,
    nationality,
    cpf,
    birth_date,
    marital_status,
    address,
    state,
    city,
    gender,
    phone_number,
  }: IRequest): Promise<Patient> {
    const patientAlreadyExistsCpf = await this.patientsRepository.findByCpf(
      cpf
    );
    if (patientAlreadyExistsCpf) {
      throw new AppError("Patient already exists!");
    }

    const patient = await this.patientsRepository.create({
      name,
      ethnicity,
      nationality,
      cpf,
      birth_date,
      marital_status,
      address,
      state,
      city,
      gender,
      phone_number,
    });

    return patient;
  }
}

export { CreatePatientUseCase };
