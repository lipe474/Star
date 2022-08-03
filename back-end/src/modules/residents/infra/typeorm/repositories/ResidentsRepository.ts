import { ICreateResidentsDTO } from "@modules/residents/dtos/ICreateResidentDTO";
import { IUpdateResidentDTO } from "@modules/residents/dtos/IUpdateResidentDTO";
import { IResidentsRepository } from "@modules/residents/repositories/IResidentsRepository";
import { AppError } from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import { Resident } from "../entities/Resident";

class ResidentsRepository implements IResidentsRepository {
  private repository: Repository<Resident>;

  constructor() {
    this.repository = getRepository(Resident);
  }

  async create({
    name,
    nationality,
    ethnicity,
    crm,
    cpf,
    residence_date,
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
  }: ICreateResidentsDTO): Promise<Resident> {
    const resident = this.repository.create({
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
      residence_date,
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
    await this.repository.save(resident);
    return resident;
  }

  async updateResident(
    id: string,
    data: IUpdateResidentDTO
  ): Promise<Resident> {
    await this.repository.update(id, {
      name: data.name,
      nationality: data.nationality,
      ethnicity: data.ethnicity,
      crm: data.crm,
      cpf: data.cpf,
      residence_date: data.residence_date,
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
    const resident = await this.repository.findOne({ id });
    return resident;
  }

  async delete(id: string): Promise<void> {
    const resident = await this.repository.findOne({ id });

    if (!resident) {
      throw new AppError("Resident does not exist");
    }

    await this.repository.delete(id);
  }

  async getAll(): Promise<Resident[]> {
    const residents = await this.repository.find({
      select: [
        "id",
        "name",
        "nationality",
        "ethnicity",
        "crm",
        "cpf",
        "residence_date",
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
    return residents;
  }

  async findById(id: string): Promise<Resident> {
    const resident = await this.repository.findOne({ id });
    return resident;
  }

  async findByCpf(cpf: string): Promise<Resident> {
    const resident = await this.repository.findOne({ cpf });
    return resident;
  }

  async findByCrm(crm: string): Promise<Resident> {
    const resident = await this.repository.findOne({ crm });
    return resident;
  }
}

export { ResidentsRepository };
