import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateResidentUseCase } from "./CreateResidentUseCase";

class CreateResidentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createResidentUseCase = container.resolve(CreateResidentUseCase);

    await createResidentUseCase.execute({
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
    });

    return response.status(201).send();
  }
}

export { CreateResidentController };
