import { inject, injectable } from "tsyringe";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";

@injectable()
class GetPatientByIdUseCase {
  constructor(
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findById(id);
    return patient;
  }
}

export { GetPatientByIdUseCase };
