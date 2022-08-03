import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedicsTokens1655835702142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "medics_tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "refresh_token",
            type: "varchar",
          },
          {
            name: "medic_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "resident_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "teacher_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "expires_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKMedicToken",
            referencedTableName: "medics",
            referencedColumnNames: ["id"],
            columnNames: ["medic_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKResidentToken",
            referencedTableName: "residents",
            referencedColumnNames: ["id"],
            columnNames: ["resident_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKTeacherToken",
            referencedTableName: "teachers",
            referencedColumnNames: ["id"],
            columnNames: ["teacher_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("medics_tokens");
  }
}
