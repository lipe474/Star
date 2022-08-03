import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateExamAttachmentUseCase } from "./UpdateExamAttachmentUseCase";

class UpdateExamAttachmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const attachment = request.file.filename;

    const updateExamAttachmentUseCase = container.resolve(
      UpdateExamAttachmentUseCase
    );

    const attachmentURL = await updateExamAttachmentUseCase.execute(attachment);

    return response.json(attachmentURL);
  }
}

export { UpdateExamAttachmentController };
