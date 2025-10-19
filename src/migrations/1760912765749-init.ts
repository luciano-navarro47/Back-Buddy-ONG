import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1760912765749 implements MigrationInterface {
    name = 'Init1760912765749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "name" text`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "foundAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "resolvedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "adopterId" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."pet_size_enum" RENAME TO "pet_size_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_size_enum" AS ENUM('small', 'medium', 'large')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "size" TYPE "public"."pet_size_enum" USING "size"::"text"::"public"."pet_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_size_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_specie_enum" RENAME TO "pet_specie_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_specie_enum" AS ENUM('dog', 'cat')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "specie" TYPE "public"."pet_specie_enum" USING "specie"::"text"::"public"."pet_specie_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_specie_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_age_enum" RENAME TO "pet_age_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_age_enum" AS ENUM('puppy', 'young', 'adult')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "age" TYPE "public"."pet_age_enum" USING "age"::"text"::"public"."pet_age_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_age_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "images" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TYPE "public"."pet_sex_enum" RENAME TO "pet_sex_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_sex_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "sex" TYPE "public"."pet_sex_enum" USING "sex"::"text"::"public"."pet_sex_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_sex_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_posttype_enum" RENAME TO "pet_posttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_posttype_enum" AS ENUM('wanted', 'abandoned', 'in_adoption')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "postType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "postType" TYPE "public"."pet_posttype_enum" USING "postType"::"text"::"public"."pet_posttype_enum"`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "postType" SET DEFAULT 'in_adoption'`);
        await queryRunner.query(`DROP TYPE "public"."pet_posttype_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_casestatus_enum" RENAME TO "pet_casestatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_casestatus_enum" AS ENUM('open', 'resolved', 'adopted')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "caseStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "caseStatus" TYPE "public"."pet_casestatus_enum" USING "caseStatus"::"text"::"public"."pet_casestatus_enum"`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "caseStatus" SET DEFAULT 'open'`);
        await queryRunner.query(`DROP TYPE "public"."pet_casestatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pet_casestatus_enum_old" AS ENUM('activo', 'resuelto', 'adoptado')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "caseStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "caseStatus" TYPE "public"."pet_casestatus_enum_old" USING "caseStatus"::"text"::"public"."pet_casestatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "caseStatus" SET DEFAULT 'activo'`);
        await queryRunner.query(`DROP TYPE "public"."pet_casestatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_casestatus_enum_old" RENAME TO "pet_casestatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_posttype_enum_old" AS ENUM('perdido', 'encontrado', 'en_adopcion')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "postType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "postType" TYPE "public"."pet_posttype_enum_old" USING "postType"::"text"::"public"."pet_posttype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "postType" SET DEFAULT 'en_adopcion'`);
        await queryRunner.query(`DROP TYPE "public"."pet_posttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_posttype_enum_old" RENAME TO "pet_posttype_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_sex_enum_old" AS ENUM('macho', 'hembra')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "sex" TYPE "public"."pet_sex_enum_old" USING "sex"::"text"::"public"."pet_sex_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."pet_sex_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_sex_enum_old" RENAME TO "pet_sex_enum"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "images" text array NOT NULL DEFAULT ARRAY[]`);
        await queryRunner.query(`CREATE TYPE "public"."pet_age_enum_old" AS ENUM('cachorro', 'joven', 'adulto')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "age" TYPE "public"."pet_age_enum_old" USING "age"::"text"::"public"."pet_age_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."pet_age_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_age_enum_old" RENAME TO "pet_age_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_specie_enum_old" AS ENUM('perro', 'gato')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "specie" TYPE "public"."pet_specie_enum_old" USING "specie"::"text"::"public"."pet_specie_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."pet_specie_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_specie_enum_old" RENAME TO "pet_specie_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."pet_size_enum_old" AS ENUM('pequeño', 'mediano', 'grande')`);
        await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "size" TYPE "public"."pet_size_enum_old" USING "size"::"text"::"public"."pet_size_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."pet_size_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pet_size_enum_old" RENAME TO "pet_size_enum"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "adopterId"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "resolvedAt"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "foundAt"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "name"`);
    }

}
