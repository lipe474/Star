import { ICreateMedicTokenDTO } from "@modules/medics/dtos/ICreateMedicTokenDTO";
import { IMedicsTokensRepository } from "@modules/medics/repositories/IMedicsTokensRepository";
import { getRepository, Repository } from "typeorm";
import { MedicTokens } from "../entities/MedicTokens";

class MedicsTokenRepository implements IMedicsTokensRepository {
  private repository: Repository<MedicTokens>;

  constructor() {
    this.repository = getRepository(MedicTokens);
  }

  async create({
    expires_date,
    refresh_token,
    medic_id,
    resident_id,
    teacher_id,
  }: ICreateMedicTokenDTO): Promise<MedicTokens> {
    const medicToken = this.repository.create({
      expires_date,
      refresh_token,
      medic_id,
      resident_id,
      teacher_id,
    });

    await this.repository.save(medicToken);

    return medicToken;
  }

  async findByMedicIdAndRefreshToken(
    medic_id: string,
    refresh_token: string
  ): Promise<MedicTokens> {
    const medicToken = await this.repository.findOne({
      medic_id,
      refresh_token,
    });
    return medicToken;
  }

  async findByResidentIdAndRefreshToken(
    resident_id: string,
    refresh_token: string
  ): Promise<MedicTokens> {
    const medicToken = await this.repository.findOne({
      resident_id,
      refresh_token,
    });
    return medicToken;
  }

  async findByTeacherIdAndRefreshToken(
    teacher_id: string,
    refresh_token: string
  ): Promise<MedicTokens> {
    const medicToken = await this.repository.findOne({
      teacher_id,
      refresh_token,
    });
    return medicToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { MedicsTokenRepository };
