import { inject, injectable } from "tsyringe";
import { Resident } from "@modules/residents/infra/typeorm/entities/Resident";
import { IResidentsRepository } from "@modules/residents/repositories/IResidentsRepository";

@injectable()
class GetResidentByIdUseCase {
  constructor(
    @inject("ResidentsRepository")
    private residentsRepository: IResidentsRepository
  ) {}

  async execute(id: string): Promise<Resident> {
    const resident = await this.residentsRepository.findById(id);
    return resident;
  }
}

export { GetResidentByIdUseCase };
