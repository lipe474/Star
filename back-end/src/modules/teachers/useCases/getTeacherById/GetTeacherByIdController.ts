import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTeacherByIdUseCase } from "./GetTeacherByIdUseCase";

class GetTeacherByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getTeacherByIdUseCase = container.resolve(GetTeacherByIdUseCase);

    const teacher = await getTeacherByIdUseCase.execute(id);

    return response.json(teacher);
  }
}

export { GetTeacherByIdController };
