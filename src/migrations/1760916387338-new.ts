import { MigrationInterface, QueryRunner } from "typeorm";

export class New1760916387338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pet
        ADD COLUMN IF NOT EXISTS images text[];
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'pet' AND column_name = 'img'
        ) THEN
          UPDATE pet
          SET images = ARRAY[img]::text[]
          WHERE images IS NULL OR array_length(images, 1) IS NULL;

          ALTER TABLE pet DROP COLUMN IF EXISTS img;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      ALTER TABLE pet
        ADD COLUMN IF NOT EXISTS street text,
        ADD COLUMN IF NOT EXISTS number integer,
        ADD COLUMN IF NOT EXISTS city text,
        ADD COLUMN IF NOT EXISTS videos text[] DEFAULT ARRAY[]::text[],
        ADD COLUMN IF NOT EXISTS name text,
        ADD COLUMN IF NOT EXISTS "foundAt" timestamp,
        ADD COLUMN IF NOT EXISTS "resolvedAt" timestamp,
        ADD COLUMN IF NOT EXISTS "adopterId" uuid;
    `);

    await queryRunner.query(`
      UPDATE pet
      SET videos = ARRAY[]::text[]
      WHERE videos IS NULL;
    `);

    await queryRunner.query(`
      UPDATE pet
      SET images = ARRAY['placeholder-1','placeholder-2','placeholder-3']::text[]
      WHERE images IS NULL
        OR array_length(images, 1) IS NULL
        OR array_length(images, 1) != 3;
    `);

    await queryRunner.query(`
      ALTER TABLE pet
      ALTER COLUMN images SET DEFAULT ARRAY['placeholder-1','placeholder-2','placeholder-3']::text[],
      ALTER COLUMN images SET NOT NULL;
    `);

    await queryRunner.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1
            FROM pg_constraint
            WHERE conname = 'pet_images_len'
          ) THEN
            ALTER TABLE pet
              ADD CONSTRAINT pet_images_len CHECK (array_length(images, 1) = 3);
          END IF;
        END
        $$;
      `);

    await queryRunner.query(`
      UPDATE pet
      SET street = coalesce(street, 'Not indicated'),
          city = coalesce(city, 'Not indicated')
      WHERE street IS NULL OR city IS NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE pet
      ALTER COLUMN street SET NOT NULL,
      ALTER COLUMN city SET NOT NULL;
    `);

    await queryRunner.query(`
        ALTER TABLE pet ALTER COLUMN size TYPE text USING size::text;
  UPDATE pet
  SET size = CASE
    WHEN size = 'pequeño' THEN 'small'
    WHEN size = 'mediano' THEN 'medium'
    WHEN size = 'grande' THEN 'large'
    ELSE size
  END;
  CREATE TYPE pet_size_enum_new AS ENUM ('small','medium','large');
  ALTER TABLE pet ALTER COLUMN size TYPE pet_size_enum_new USING size::text::pet_size_enum_new;
  DROP TYPE IF EXISTS pet_size_enum;
  ALTER TYPE pet_size_enum_new RENAME TO pet_size_enum;
      `);
    await queryRunner.query(`
ALTER TABLE pet ALTER COLUMN specie TYPE text USING specie::text;
UPDATE pet
SET specie = CASE
  WHEN specie = 'perro' THEN 'dog'
  WHEN specie = 'gato' THEN 'cat'
  ELSE specie
END;
CREATE TYPE pet_specie_enum_new AS ENUM ('dog','cat');
ALTER TABLE pet ALTER COLUMN specie TYPE pet_specie_enum_new USING specie::text::pet_specie_enum_new;
DROP TYPE IF EXISTS pet_specie_enum;
ALTER TYPE pet_specie_enum_new RENAME TO pet_specie_enum;
    `);

    await queryRunner.query(`
ALTER TABLE pet ALTER COLUMN age TYPE text USING age::text;
UPDATE pet
SET age = CASE
  WHEN age = 'cachorro' THEN 'puppy'
  WHEN age = 'joven' THEN 'young'
  WHEN age = 'adulto' THEN 'adult'
  ELSE age
END;
CREATE TYPE pet_age_enum_new AS ENUM ('puppy','young','adult');
ALTER TABLE pet ALTER COLUMN age TYPE pet_age_enum_new USING age::text::pet_age_enum_new;
DROP TYPE IF EXISTS pet_age_enum;
ALTER TYPE pet_age_enum_new RENAME TO pet_age_enum;
    `);

    await queryRunner.query(`
ALTER TABLE pet ALTER COLUMN sex TYPE text USING sex::text;
UPDATE pet
SET sex = CASE
  WHEN sex = 'macho' THEN 'male'
  WHEN sex = 'hembra' THEN 'female'
  ELSE sex
END;
CREATE TYPE pet_sex_enum_new AS ENUM ('male','female');
ALTER TABLE pet ALTER COLUMN sex TYPE pet_sex_enum_new USING sex::text::pet_sex_enum_new;
DROP TYPE IF EXISTS pet_sex_enum;
ALTER TYPE pet_sex_enum_new RENAME TO pet_sex_enum;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        -- 1) Si no existe postType, crearla temporalmente como text
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='pet' AND column_name='postType'
        ) THEN
          ALTER TABLE pet ADD COLUMN "postType" text;
        END IF;
      
        -- 2) Si existe la columna antigua "status", migrar sus valores a postType (casteando status::text)
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='pet' AND column_name='status'
        ) THEN
          -- Copiar status a postType sólo donde postType esté vacío
          UPDATE pet
          SET "postType" = COALESCE("postType", ("status")::text)
          WHERE ("postType" IS NULL OR "postType" = '') AND ("status" IS NOT NULL);
      
          -- Opcional: no dropear status todavía para chequeo. Si querés dropear, descomenta la siguiente línea:
          -- ALTER TABLE pet DROP COLUMN IF EXISTS "status";
        END IF;
      
        -- 3) Mapping español -> inglés (si aplica)
        UPDATE pet
  SET "postType" = CASE
    WHEN LOWER("postType"::text) = 'buscado' THEN 'wanted'
    WHEN LOWER("postType"::text) = 'abandonado' THEN 'abandoned'
    WHEN LOWER("postType"::text) = 'en_adopcion' THEN 'in_adoption'
    WHEN LOWER("postType"::text) = 'adoptado' THEN 'in_adoption'
    ELSE "postType"
  END
  WHERE "postType" IS NOT NULL;
      
        -- 4) Rellenar NULLs/empties con default textual
        UPDATE pet
        SET "postType" = 'in_adoption'
        WHERE "postType" IS NULL OR "postType" = '';
      
        -- 5) Crear enum si no existe
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pet_posttype_enum') THEN
          CREATE TYPE pet_posttype_enum AS ENUM ('wanted','abandoned','in_adoption');
        END IF;
      
        -- 6) Convertir columna postType a enum de forma segura
        BEGIN
          ALTER TABLE pet
            ALTER COLUMN "postType" TYPE pet_posttype_enum USING "postType"::text::pet_posttype_enum;
          ALTER TABLE pet
            ALTER COLUMN "postType" SET DEFAULT 'in_adoption'::pet_posttype_enum;
        EXCEPTION WHEN others THEN
          RAISE NOTICE 'Could not convert postType to enum - inspect values with SELECT DISTINCT "postType" FROM pet;';
          RAISE;
        END;
      END
      $$;
      `);

    await queryRunner.query(`

ALTER TABLE pet
  ALTER COLUMN "caseStatus" DROP DEFAULT;

ALTER TABLE pet
  ALTER COLUMN "caseStatus" TYPE text USING "caseStatus"::text;

UPDATE pet
SET "caseStatus" = CASE
        WHEN "caseStatus" = 'activo' THEN 'open'
        WHEN "caseStatus" = 'resuelto' THEN 'resolved'
        WHEN "caseStatus" = 'adoptado' THEN 'adopted'
        ELSE "caseStatus"
      END;

CREATE TYPE pet_casestatus_enum_new AS ENUM ('open','resolved','adopted');

ALTER TABLE pet
  ALTER COLUMN "caseStatus" TYPE pet_casestatus_enum_new USING "caseStatus"::text::pet_casestatus_enum_new;

ALTER TABLE pet
  ALTER COLUMN "caseStatus" SET DEFAULT 'open'::pet_casestatus_enum_new;

DROP TYPE IF EXISTS pet_casestatus_enum;
ALTER TYPE pet_casestatus_enum_new RENAME TO pet_casestatus_enum;
    `);

    await queryRunner.query(`
        ALTER TABLE pet
            DROP COLUMN IF EXISTS "area";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pet
        DROP CONSTRAINT IF EXISTS pet_images_len,
        ALTER COLUMN images DROP DEFAULT,
        ALTER COLUMN images DROP NOT NULL,
        DROP COLUMN IF EXISTS street,
        DROP COLUMN IF EXISTS number,
        DROP COLUMN IF EXISTS city,
        DROP COLUMN IF EXISTS name,
        DROP COLUMN IF EXISTS videos;
    `);
  }
}
