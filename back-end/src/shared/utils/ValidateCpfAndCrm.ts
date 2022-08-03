import { IMedicsRepository } from "@modules/medics/repositories/IMedicsRepository";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { IResidentsRepository } from "@modules/residents/repositories/IResidentsRepository";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ValidateCpfAndCrm {
  constructor(
    @inject("MedicsRepository")
    private medicsRepository: IMedicsRepository,
    @inject("ResidentsRepository")
    private residentsRepository: IResidentsRepository,
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository,
    @inject("PatientsRepository")
    private patientsRepository: IPatientsRepository
  ) {}

  async execute(crm: string, cpf: string): Promise<void> {
    const medicAlreadyExistsCpf = await this.medicsRepository.findByCpf(cpf);
    if (medicAlreadyExistsCpf) {
      throw new AppError("Medic already exists!");
    }
    const medicAlreadyExistsCrm = await this.medicsRepository.findByCrm(crm);
    if (medicAlreadyExistsCrm) {
      throw new AppError("Medic already exists!");
    }

    const residentAlreadyExistsCpf = await this.residentsRepository.findByCpf(
      cpf
    );
    if (residentAlreadyExistsCpf) {
      throw new AppError("Resident already exists!");
    }
    const residentAlreadyExistsCrm = await this.residentsRepository.findByCrm(
      crm
    );
    if (residentAlreadyExistsCrm) {
      throw new AppError("Resident already exists!");
    }

    const teacherAlreadyExistsCpf = await this.teachersRepository.findByCpf(
      cpf
    );
    if (teacherAlreadyExistsCpf) {
      throw new AppError("Teacher already exists!");
    }
    const teacherAlreadyExistsCrm = await this.teachersRepository.findByCrm(
      crm
    );
    if (teacherAlreadyExistsCrm) {
      throw new AppError("Teacher already exists!");
    }

    const patientAlreadyExistsCpf = await this.patientsRepository.findByCpf(
      cpf
    );
    if (patientAlreadyExistsCpf) {
      throw new AppError("Patient already exists!");
    }
  }
}

export { ValidateCpfAndCrm };
