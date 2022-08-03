import { reportStatus } from "@shared/enums/ReportStatusEnum";

interface IUpdateExamDTO {
  name: string;
  date: Date;
  attachment?: string;
  report: string;
  status: reportStatus;
  id: string;
}

export { IUpdateExamDTO };
