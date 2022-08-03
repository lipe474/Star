import { inject, injectable } from "tsyringe";
import { IResidentsRepository } from "@modules/residents/repositories/IResidentsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteResidentUseCase {
  constructor(
    @inject("ResidentsRepository")
    private residentsRepository: IResidentsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const resident = await this.residentsRepository.findById(id);

    if (!resident) {
      throw new AppError("Resident does not exists!");
    }

    await this.residentsRepository.delete(id);
  }
}

export { DeleteResidentUseCase };
