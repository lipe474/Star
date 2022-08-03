import { ICreatePatientDTO } from "@modules/patients/dtos/ICreatePatientDTO";
import { IUpdatePatientDTO } from "@modules/patients/dtos/IUpdatePatientDTO";
import { IPatientsRepository } from "@modules/patients/repositories/IPatientsRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { Patient } from "../entities/Patient";

class PatientsRepository implements IPatientsRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  async create({
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
    id,
  }: ICreatePatientDTO): Promise<Patient> {
    const patient = this.repository.create({
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
      id,
    });

    await this.repository.save(patient);
    return patient;
  }

  async updatePatient(id: string, data: IUpdatePatientDTO): Promise<Patient> {
    await this.repository.update(id, {
      name: data.name,
      ethnicity: data.ethnicity,
      nationality: data.nationality,
      cpf: data.cpf,
      birth_date: data.birth_date,
      marital_status: data.marital_status,
      address: data.address,
      state: data.state,
      city: data.city,
      gender: data.gender,
      phone_number: data.phone_number,
    });
    const patient = await this.repository.findOne({ id });
    return patient;
  }

  async delete(id: string): Promise<void> {
    const patient = await this.repository.findOne({ id });

    if (!patient) {
      throw new AppError("Patient does not exist");
    }

    await this.repository.delete(id);
  }

  async getAll(): Promise<Patient[]> {
    const patients = await this.repository.find();
    return patients;
  }

  async findByCpf(cpf: string): Promise<Patient> {
    const patient = await this.repository.findOne({ cpf });
    return patient;
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.repository.findOne({ id });
    return patient;
  }
}

export { PatientsRepository };
