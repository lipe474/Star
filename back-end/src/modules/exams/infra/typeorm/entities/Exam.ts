import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ExamRequest } from "../../../../examsRequest/infra/typeorm/entities/ExamRequest";
import { reportStatus } from "../../../../../shared/enums/ReportStatusEnum";

@Entity("exams")
class Exam {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  attachment: string;

  @Column()
  report: string;

  @Column({ type: "enum", enum: reportStatus })
  status: reportStatus;

  @Column()
  examRequest_id: string;

  @ManyToOne(() => ExamRequest, { onDelete: "CASCADE" })
  @JoinColumn({ name: "examRequest_id" })
  examRequest: ExamRequest;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Exam };
