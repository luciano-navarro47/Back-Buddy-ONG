import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeBillingAddressNullable1670000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "order"
      ALTER COLUMN billing_address DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Si revertís y hay filas con NULL esto fallará — tenelo en cuenta.
    await queryRunner.query(`
      ALTER TABLE "order"
      ALTER COLUMN billing_address SET NOT NULL;
    `);
  }
}
