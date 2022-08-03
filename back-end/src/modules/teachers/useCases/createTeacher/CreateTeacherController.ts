import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTeacherUseCase } from "./CreateTeacherUseCase";

class CreateTeacherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
      titration,
      password,
      marital_status,
      birth_date,
      address,
      city,
      state,
      gender,
      especialization,
      phone_number,
    } = request.body;

    const createTeacherUseCase = container.resolve(CreateTeacherUseCase);

    await createTeacherUseCase.execute({
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
      titration,
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

    return response.status(201).send();
  }
}

export { CreateTeacherController };
