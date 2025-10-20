import { MigrationInterface, QueryRunner } from "typeorm";

export class New1760916387338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1) Agregar columnas nuevas como NULLABLE / con default seguro (videos como text[])
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

    // 1.1) Asegurar videos no nulo (por si alguna fila quedó con NULL)
    await queryRunner.query(`
      UPDATE pet
      SET videos = ARRAY[]::text[]
      WHERE videos IS NULL;
    `);

    // 2) Asegurar images: si es NULL o no es array o tiene longitud distinta de 3, reemplazar por placeholders (text[])
    await queryRunner.query(`
      UPDATE pet
      SET images = ARRAY['placeholder-1','placeholder-2','placeholder-3']::text[]
      WHERE images IS NULL
        OR array_length(images, 1) IS NULL
        OR array_length(images, 1) != 3;
    `);

    // 2.1) Establecer DEFAULT y NOT NULL para images
    await queryRunner.query(`
      ALTER TABLE pet
      ALTER COLUMN images SET DEFAULT ARRAY['placeholder-1','placeholder-2','placeholder-3']::text[],
      ALTER COLUMN images SET NOT NULL;
    `);

    // 2.2) Añadir CHECK para images = 3 elementos (en array)
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

    // 3) Rellenar street/city existentes si faltan y hacerlos NOT NULL
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

    // 4) Recasteos de valores existentes (español -> inglés)
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

    // Recasteo de postType y caseStatus (solo actualizar valores existentes)
    await queryRunner.query(`

ALTER TABLE pet
  ALTER COLUMN "postType" DROP DEFAULT;

ALTER TABLE pet
  ALTER COLUMN "postType" TYPE text USING "postType"::text;

UPDATE pet
SET "postType" = CASE
  WHEN "postType" = 'buscado' THEN 'wanted'
  WHEN "postType" = 'abandonado' THEN 'abandoned'
  WHEN "postType" = 'en_adopcion' THEN 'in_adoption'
  ELSE "postType"
END;

CREATE TYPE pet_posttype_enum_new AS ENUM ('wanted','abandoned','in_adoption');

ALTER TABLE pet
  ALTER COLUMN "postType" TYPE pet_posttype_enum_new USING "postType"::text::pet_posttype_enum_new;

ALTER TABLE pet
  ALTER COLUMN "postType" SET DEFAULT 'in_adoption'::pet_posttype_enum_new;

DROP TYPE IF EXISTS pet_posttype_enum;
ALTER TYPE pet_posttype_enum_new RENAME TO pet_posttype_enum;
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
    // Revert only what this migration added; we don't touch postType/caseStatus
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
