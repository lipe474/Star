import { reportStatus } from "@shared/enums/ReportStatusEnum";

interface ICreateExamDTO {
  name: string;
  date: Date;
  attachment?: string;
  report: string;
  status: reportStatus;
  examRequest_id: string;
  id?: string;
}

export { ICreateExamDTO };
