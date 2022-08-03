import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateMedicUseCase } from "./UpdateMedicUseCase";

class UpdateMedicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { ...data } = request.body;

    const updateMedicUseCase = container.resolve(UpdateMedicUseCase);

    await updateMedicUseCase.execute(id, data);

    return response.status(204).send();
  }
}

export { UpdateMedicController };
