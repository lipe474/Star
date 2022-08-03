import { ICreateMedicDTO } from "@modules/medics/dtos/ICreateMedicDTO";
import { IUpdateMedicDTO } from "@modules/medics/dtos/IUpdateMedicDTO";
import { Medic } from "@modules/medics/infra/typeorm/entities/Medic";
import { IMedicsRepository } from "../IMedicsRepository";

class MedicsRepositoryInMemory implements IMedicsRepository {
  medics: Medic[] = [];

  async create({
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
    const medic = new Medic();

    Object.assign(medic, {
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
    });
    this.medics.push(medic);
    return medic;
  }

  async updateMedic(id: string, data: IUpdateMedicDTO): Promise<Medic> {
    const medic = this.medics.find((medic) => medic.id === id);
    const index = this.medics.indexOf(medic);

    Object.assign(medic, {
      name: data.name,
      nationality: data.nationality,
      ethnicity: data.ethnicity,
      crm: data.crm,
      cpf: data.cpf,
      password: data.password,
      marital_status: data.marital_status,
      birth_date: data.birth_date,
      address: data.address,
      city: data.city,
      state: data.state,
      gender: data.gender,
      especialization: data.especialization,
      phone_number: data.phone_number,
    });
    this.medics.splice(index, 1, medic);
    return medic;
  }

  async delete(id: string): Promise<void> {
    const medic = this.medics.find((medic) => medic.id === id);
    this.medics.splice(this.medics.indexOf(medic));
  }

  async getAll(): Promise<Medic[]> {
    return this.medics;
  }

  async findById(id: string): Promise<Medic> {
    return this.medics.find((medic) => medic.id === id);
  }

  async findByCpf(cpf: string): Promise<Medic> {
    return this.medics.find((medic) => medic.cpf === cpf);
  }

  async findByCrm(crm: string): Promise<Medic> {
    return this.medics.find((medic) => medic.crm === crm);
  }
}

export { MedicsRepositoryInMemory };
