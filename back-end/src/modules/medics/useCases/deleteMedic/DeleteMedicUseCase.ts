import { inject, injectable } from "tsyringe";
import { IMedicsRepository } from "@modules/medics/repositories/IMedicsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteMedicUseCase {
  constructor(
    @inject("MedicsRepository")
    private medicsRepository: IMedicsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const medic = await this.medicsRepository.findById(id);

    if (!medic) {
      throw new AppError("Medic does not exists!");
    }

    await this.medicsRepository.delete(id);
  }
}

export { DeleteMedicUseCase };
