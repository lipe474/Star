import { ICreatePatientDTO } from "../dtos/ICreatePatientDTO";
import { IUpdatePatientDTO } from "../dtos/IUpdatePatientDTO";
import { Patient } from "../infra/typeorm/entities/Patient";

interface IPatientsRepository {
  create(data: ICreatePatientDTO): Promise<Patient>;
  updatePatient(id: string, data: IUpdatePatientDTO): Promise<Patient>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient>;
  findByCpf(cpf: string): Promise<Patient>;
}

export { IPatientsRepository };
