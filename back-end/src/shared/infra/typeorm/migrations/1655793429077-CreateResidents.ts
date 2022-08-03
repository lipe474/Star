import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateResidents1655793429077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "residents",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "ethnicity",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nationality",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "crm",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "residence_date",
            type: "Date",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "marital_status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "birth_date",
            type: "Date",
          },
          {
            name: "address",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "gender",
            type: "varchar",
          },
          {
            name: "especialization",
            type: "varchar",
          },
          {
            name: "phone_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("residents");
  }
}
