import { ICreatePatientDTO } from "@modules/patients/dtos/ICreatePatientDTO";
import { IUpdatePatientDTO } from "@modules/patients/dtos/IUpdatePatientDTO";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import { IPatientsRepository } from "../IPatientsRepository";

class PatientsRepositoryInMemory implements IPatientsRepository {
  patients: Patient[] = [];

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
  }: ICreatePatientDTO): Promise<Patient> {
    const patient = new Patient();

    Object.assign(patient, {
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
    this.patients.push(patient);
    return patient;
  }

  async updatePatient(id: string, data: IUpdatePatientDTO): Promise<Patient> {
    const patient = this.patients.find((patient) => patient.id === id);
    const index = this.patients.indexOf(patient);

    Object.assign(patient, {
      name: data.name,
      nationality: data.nationality,
      ethnicity: data.ethnicity,
      cpf: data.cpf,
      marital_status: data.marital_status,
      birth_date: data.birth_date,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      phone_number: data.phone_number,
    });
    this.patients.splice(index, 1, patient);
    return patient;
  }

  async delete(id: string): Promise<void> {
    const patient = await this.patients.find((patient) => patient.id === id);
    this.patients.splice(this.patients.indexOf(patient));
  }

  async getAll(): Promise<Patient[]> {
    const list = this.patients;
    return list;
  }

  async findById(id: string): Promise<Patient> {
    return this.patients.find((patient) => patient.id === id);
  }

  async findByCpf(cpf: string): Promise<Patient> {
    return this.patients.find((patient) => patient.cpf === cpf);
  }
}

export { PatientsRepositoryInMemory };
