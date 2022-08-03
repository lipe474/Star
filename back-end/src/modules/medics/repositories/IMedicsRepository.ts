import { ICreateMedicDTO } from "../dtos/ICreateMedicDTO";
import { IUpdateMedicDTO } from "../dtos/IUpdateMedicDTO";
import { Medic } from "../infra/typeorm/entities/Medic";

interface IMedicsRepository {
  create(data: ICreateMedicDTO): Promise<Medic>;
  updateMedic(id: string, data: IUpdateMedicDTO): Promise<Medic>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Medic[]>;
  findById(id: string): Promise<Medic>;
  findByCpf(cpf: string): Promise<Medic>;
  findByCrm(crm: string): Promise<Medic>;
}

export { IMedicsRepository };
