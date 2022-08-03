import { ICreateMedicDTO } from "@modules/medics/dtos/ICreateMedicDTO";
import { IUpdateMedicDTO } from "@modules/medics/dtos/IUpdateMedicDTO";
import { IMedicsRepository } from "@modules/medics/repositories/IMedicsRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { Medic } from "../entities/Medic";

class MedicsRepository implements IMedicsRepository {
  private repository: Repository<Medic>;

  constructor() {
    this.repository = getRepository(Medic);
  }

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
    id,
  }: ICreateMedicDTO): Promise<Medic> {
    const medic = this.repository.create({
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
      id,
    });
    await this.repository.save(medic);
    return medic;
  }

  async updateMedic(id: string, data: IUpdateMedicDTO): Promise<Medic> {
    await this.repository.update(id, {
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
    const medic = await this.repository.findOne({ id });
    return medic;
  }

  async delete(id: string): Promise<void> {
    const medic = await this.repository.findOne({ id });

    if (!medic) {
      throw new AppError("Medic does not exist");
    }

    await this.repository.delete(id);
  }

  async getAll(): Promise<Medic[]> {
    const medics = await this.repository.find({
      select: [
        "id",
        "name",
        "nationality",
        "ethnicity",
        "crm",
        "cpf",
        "marital_status",
        "birth_date",
        "address",
        "city",
        "state",
        "gender",
        "especialization",
        "phone_number",
      ],
    });
    return medics;
  }

  async findById(id: string): Promise<Medic> {
    const medic = await this.repository.findOne({ id });
    return medic;
  }

  async findByCpf(cpf: string): Promise<Medic> {
    const medic = await this.repository.findOne({ cpf });
    return medic;
  }

  async findByCrm(crm: string): Promise<Medic> {
    const medic = await this.repository.findOne({ crm });
    return medic;
  }
}

export { MedicsRepository };
