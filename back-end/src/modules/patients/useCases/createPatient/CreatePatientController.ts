import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

class CreatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      ethnicity,
      nationality,
      cpf,
      birth_date,
      marital_status,
      address,
      state,
      city,
      gender,
      phone_number,
    } = request.body;

    const createPatientUseCase = container.resolve(CreatePatientUseCase);

    await createPatientUseCase.execute({
      name,
      ethnicity,
      nationality,
      cpf,
      birth_date,
      marital_status,
      address,
      state,
      city,
      gender,
      phone_number,
    });

    return response.status(201).send();
  }
}

export { CreatePatientController };
