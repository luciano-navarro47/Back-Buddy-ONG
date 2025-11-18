import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTablesAndFixPet1731500000000 implements MigrationInterface {
  name = "CreateOrderTablesAndFixPet1731500000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ========================================
    // 1. CREAR ENUM PARA STATUS DE ORDER
    // ========================================
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status_enum') THEN
          CREATE TYPE order_status_enum AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
        END IF;
      END
      $$;
    `);

    // ========================================
    // 2. CREAR TABLA ORDER
    // ========================================
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "external_reference" text NOT NULL,
        "merchant_order_id" text,
        "user_id" uuid NOT NULL,
        "buyer_name" text,
        "buyer_email" text,
        "status" order_status_enum NOT NULL,
        "total_amount" numeric NOT NULL,
        "currency" text NOT NULL,
        "discount_amount" numeric DEFAULT 0,
        "payment_method_id" text,
        "installments" integer DEFAULT 1,
        "shipping_cost" numeric DEFAULT 0,
        "shipping_address" jsonb,
        "billing_address" jsonb NOT NULL,
        "raw_response" jsonb NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "fk_order_user" FOREIGN KEY ("user_id") 
          REFERENCES "user"("id") ON DELETE CASCADE
      )
    `);

    // Crear índices para mejorar performance
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_order_user_id" ON "order"("user_id")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_order_status" ON "order"("status")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_order_external_reference" ON "order"("external_reference")
    `);

    // ========================================
    // 3. CREAR TABLA ORDER_ITEM
    // ========================================
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_item" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" text NOT NULL,
        "unit_price" numeric NOT NULL,
        "quantity" integer NOT NULL,
        "discount" numeric DEFAULT 0,
        "subtotal" numeric NOT NULL,
        "order_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        CONSTRAINT "fk_order_item_order" FOREIGN KEY ("order_id") 
          REFERENCES "order"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_order_item_product" FOREIGN KEY ("product_id") 
          REFERENCES "product"("id") ON DELETE CASCADE,
        CONSTRAINT "chk_quantity_positive" CHECK (quantity > 0)
      )
    `);

    // Crear índices
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_order_item_order_id" ON "order_item"("order_id")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_order_item_product_id" ON "order_item"("product_id")
    `);

    // ========================================
    // 3. ELIMINAR COLUMNA STATUS DE PET
    // ========================================
    await queryRunner.query(`
      ALTER TABLE "pet" DROP COLUMN IF EXISTS "status"
    `);

    // ========================================
    // 4. ASEGURAR QUE postType Y caseStatus TENGAN NOT NULL
    // ========================================
    await queryRunner.query(`
      -- Rellenar cualquier NULL restante en postType
      UPDATE "pet"
      SET "postType" = 'in_adoption'
      WHERE "postType" IS NULL;

      -- Rellenar cualquier NULL restante en caseStatus
      UPDATE "pet"
      SET "caseStatus" = 'open'
      WHERE "caseStatus" IS NULL;
    `);

    await queryRunner.query(`
      -- Hacer NOT NULL si no lo son
      ALTER TABLE "pet" 
        ALTER COLUMN "postType" SET NOT NULL,
        ALTER COLUMN "caseStatus" SET NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: eliminar tablas creadas
    await queryRunner.query(`DROP TABLE IF EXISTS "order_item" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "order" CASCADE`);
    
    // Restaurar columna status (opcional, por si necesitas rollback)
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='pet' AND column_name='status'
        ) THEN
          ALTER TABLE "pet" ADD COLUMN "status" text;
          
          -- Copiar de vuelta desde postType si existe
          UPDATE "pet"
          SET "status" = CASE
            WHEN "postType"::text = 'wanted' THEN 'perdido'
            WHEN "postType"::text = 'abandoned' THEN 'encontrado'
            WHEN "postType"::text = 'in_adoption' THEN 'en_adopcion'
            ELSE "postType"::text
          END;
        END IF;
      END
      $$;
    `);
  }
}