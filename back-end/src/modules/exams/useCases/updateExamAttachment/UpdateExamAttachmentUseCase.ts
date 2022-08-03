import { inject, injectable } from "tsyringe";
import { IExamsRepository } from "@modules/exams/repositories/IExamsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class UpdateExamAttachmentUseCase {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: IExamsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(attachment: string): Promise<String> {
    await this.storageProvider.save(attachment, "exams");

    await this.examsRepository.updateExamAttachment(attachment);

    return `https://api-star.s3.sa-east-1.amazonaws.com/exams/${attachment}`;
  }
}

export { UpdateExamAttachmentUseCase };
