import { Patient } from "../../../../patients/infra/typeorm/entities/Patient";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("exams_request")
class ExamRequest {
  @PrimaryColumn()
  id: string;

  @Column()
  exams: string;

  @Column()
  diagnostic_hypothesis: string;

  @Column()
  date: Date;

  @Column()
  patient_id: string;

  @ManyToOne(() => Patient, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ExamRequest };
