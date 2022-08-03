import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateMedicUseCase } from "./CreateMedicUseCase";

class CreateMedicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
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

    const createMedicUseCase = container.resolve(CreateMedicUseCase);

    await createMedicUseCase.execute({
      name,
      nationality,
      ethnicity,
      crm,
      cpf,
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

export { CreateMedicController };
