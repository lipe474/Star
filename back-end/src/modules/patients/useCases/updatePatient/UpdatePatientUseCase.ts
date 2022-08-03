import { inject, injectable } from "tsyringe";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { IUpdatePatientDTO } from "@modules/patients/dtos/IUpdatePatientDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdatePatientUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientesRepository: IPatientsRepository
  ) {}

  async execute(id: string, data: IUpdatePatientDTO): Promise<Patient> {
    const patient = await this.patientesRepository.findById(id);
    if (!patient) {
      throw new AppError("Patient does not exists!");
    }

    const patientAlreadyExists = await this.patientesRepository.findByCpf(
      data.id
    );
    if (patientAlreadyExists) {
      throw new AppError("Patient already exists!");
    }

    data = {
      id: id,
      name: data?.name,
      ethnicity: data?.ethnicity,
      nationality: data?.nationality,
      cpf: data?.cpf,
      birth_date: data?.birth_date,
      marital_status: data?.marital_status,
      address: data?.address,
      state: data?.state,
      city: data?.city,
      gender: data?.gender,
      phone_number: data?.phone_number,
    };

    await this.patientesRepository.updatePatient(id, data);
    return patient;
  }
}

export { UpdatePatientUseCase };
