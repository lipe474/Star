import { inject, injectable } from "tsyringe";
import { Medic } from "@modules/medics/infra/typeorm/entities/Medic";
import { IMedicsRepository } from "@modules/medics/repositories/IMedicsRepository";

@injectable()
class GetMedicByIdUseCase {
  constructor(
    @inject("MedicsRepository")
    private medicsRepository: IMedicsRepository
  ) {}

  async execute(id: string): Promise<Medic> {
    const medic = await this.medicsRepository.findById(id);
    return medic;
  }
}

export { GetMedicByIdUseCase };
