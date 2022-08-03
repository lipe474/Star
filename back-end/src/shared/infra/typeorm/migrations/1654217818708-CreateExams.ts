import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExams1654217818708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "exams",
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
            name: "date",
            type: "timestamp",
          },
          {
            name: "attachment",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "report",
            type: "varchar",
          },
          {
            name: "status",
            type: "enum",
            enum: ["provisory", "definitive"],
          },
          {
            name: "examRequest_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKExamRequest",
            referencedTableName: "exams_request",
            referencedColumnNames: ["id"],
            columnNames: ["examRequest_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("exams");
  }
}
