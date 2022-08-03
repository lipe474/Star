import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("residents")
class Resident {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ethnicity: string;

  @Column()
  nationality: string;

  @Column()
  crm: string;

  @Column()
  cpf: string;

  @Column()
  residence_date: string;

  @Column()
  password: string;

  @Column()
  marital_status: string;

  @Column()
  birth_date: Date;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  gender: string;

  @Column()
  especialization: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Resident };
