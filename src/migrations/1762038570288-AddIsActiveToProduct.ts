import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToProduct1730483890000 implements MigrationInterface {
  name = "AddIsActiveToProduct1730483890000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ADD COLUMN "is_active" boolean NOT NULL DEFAULT true
    `);

    await queryRunner.query(`
      UPDATE "product" SET "is_active" = true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product" DROP COLUMN "is_active"
    `);
  }
}
