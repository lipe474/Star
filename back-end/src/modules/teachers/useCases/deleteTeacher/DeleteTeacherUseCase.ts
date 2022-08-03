import { inject, injectable } from "tsyringe";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteTeacherUseCase {
  constructor(
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const teacher = await this.teachersRepository.findById(id);

    if (!teacher) {
      throw new AppError("Teacher does not exists!");
    }

    await this.teachersRepository.delete(id);
  }
}

export { DeleteTeacherUseCase };
