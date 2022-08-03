import { v4 as uuidV4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("patients")
class Patient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ethnicity: string;

  @Column()
  nationality: string;

  @Column()
  cpf: string;

  @Column()
  birth_date: Date;

  @Column()
  marital_status: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  gender: string;

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

export { Patient };
