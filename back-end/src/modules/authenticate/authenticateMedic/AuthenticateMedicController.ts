import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateMedicUseCase } from "./AuthenticateMedicUseCase";

class AuthenticateMedicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, cpf, id } = request.body;

    const authenticateMedicUseCase = container.resolve(
      AuthenticateMedicUseCase
    );

    const token = await authenticateMedicUseCase.execute({
      password,
      cpf,
      id,
    });

    return response.json(token);
  }
}

export { AuthenticateMedicController };
