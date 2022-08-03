import { inject, injectable } from "tsyringe";
import { Teacher } from "@modules/teachers/infra/typeorm/entities/Teacher";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

@injectable()
class GetTeacherByIdUseCase {
  constructor(
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository
  ) {}

  async execute(id: string): Promise<Teacher> {
    const teacher = await this.teachersRepository.findById(id);
    return teacher;
  }
}

export { GetTeacherByIdUseCase };
