import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757636397599 implements MigrationInterface {
    name = 'Init1757636397599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_category_enum" AS ENUM('food', 'toys', 'clothing', 'accessories', 'beds', 'hygiene', 'healthcare', 'bowls', 'carriers', 'litter', 'other')`);
        await queryRunner.query(`CREATE TABLE "product" ("category" "public"."product_category_enum" NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "images" text array NOT NULL DEFAULT '{}', "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(7,2) NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pet_size_enum" AS ENUM('pequeño', 'mediano', 'grande')`);
        await queryRunner.query(`CREATE TYPE "public"."pet_specie_enum" AS ENUM('perro', 'gato')`);
        await queryRunner.query(`CREATE TYPE "public"."pet_age_enum" AS ENUM('cachorro', 'joven', 'adulto')`);
        await queryRunner.query(`CREATE TYPE "public"."pet_sex_enum" AS ENUM('macho', 'hembra')`);
        await queryRunner.query(`CREATE TYPE "public"."pet_status_enum" AS ENUM('perdido', 'encontrado', 'adoptado')`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" "public"."pet_size_enum" NOT NULL, "specie" "public"."pet_specie_enum" NOT NULL, "age" "public"."pet_age_enum" NOT NULL, "img" character varying NOT NULL, "detail" character varying NOT NULL, "area" character varying NOT NULL, "sex" "public"."pet_sex_enum" NOT NULL, "status" "public"."pet_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_subscription" ("id" SERIAL NOT NULL, "card_id" character varying, "subscription_id" uuid, CONSTRAINT "PK_04f74894a2ff6d6b76a956c1ac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."subscription_status_enum" AS ENUM('pending', 'authorized', 'cancelled', 'failure')`);
        await queryRunner.query(`CREATE TYPE "public"."subscription_frequency_type_enum" AS ENUM('days', 'months')`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "preapproval_plan_id" character varying, "reason" character varying, "external_reference" character varying, "payer_email" character varying NOT NULL, "payer_id" bigint, "subscription_id" character varying, "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'pending', "frequency" integer, "frequency_type" "public"."subscription_frequency_type_enum", "transaction_amount" numeric(10,2), "currency_id" character varying, "next_payment_date" TIMESTAMP, "payment_method_id" character varying, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "last_modified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customer_id" character varying, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" character varying NOT NULL, "expiration_month" integer NOT NULL, "expiration_year" integer NOT NULL, "last_four_digit" character varying(4) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customer_id" character varying, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."donation_status_enum" AS ENUM('approved', 'pending', 'failure')`);
        await queryRunner.query(`CREATE TABLE "donation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "currency_id" character varying, "title" character varying, "collector_id" bigint, "client_id" bigint, "status" "public"."donation_status_enum" NOT NULL DEFAULT 'pending', "preference_id" character varying, "payment_id" bigint, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "donations_id" character varying, CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("mp_customer_id" character varying NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_381f44d42ecaa11922ab1aaf11b" PRIMARY KEY ("mp_customer_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'banned')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "username" character varying, "phone" bigint, "auth0Sub" character varying, "role" "public"."user_role_enum" NOT NULL, "status" "public"."user_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "mp_customer_id" character varying, CONSTRAINT "REL_d74c0ae5b5c3ba645f4e822058" UNIQUE ("mp_customer_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veterinary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "phone" integer NOT NULL, "location" numeric array NOT NULL, "address" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87df71dfa70dd5cc3184eac70e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_subscription" ADD CONSTRAINT "FK_40bdee0641a79adb945aa098d57" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_subscription" ADD CONSTRAINT "FK_db37df98633a29b521d16bd3571" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_7dffed392753c0a84d907a46196" FOREIGN KEY ("customer_id") REFERENCES "customer"("mp_customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_f5aa0baf4ff1b397b3f946a443e" FOREIGN KEY ("customer_id") REFERENCES "customer"("mp_customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_8d1d68afbc87a947c31e25bce1b" FOREIGN KEY ("donations_id") REFERENCES "customer"("mp_customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d74c0ae5b5c3ba645f4e8220585" FOREIGN KEY ("mp_customer_id") REFERENCES "customer"("mp_customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d74c0ae5b5c3ba645f4e8220585"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_8d1d68afbc87a947c31e25bce1b"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_f5aa0baf4ff1b397b3f946a443e"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_7dffed392753c0a84d907a46196"`);
        await queryRunner.query(`ALTER TABLE "card_subscription" DROP CONSTRAINT "FK_db37df98633a29b521d16bd3571"`);
        await queryRunner.query(`ALTER TABLE "card_subscription" DROP CONSTRAINT "FK_40bdee0641a79adb945aa098d57"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479"`);
        await queryRunner.query(`DROP TABLE "veterinary"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "donation"`);
        await queryRunner.query(`DROP TYPE "public"."donation_status_enum"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TYPE "public"."subscription_frequency_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
        await queryRunner.query(`DROP TABLE "card_subscription"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TYPE "public"."pet_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_sex_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_age_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_specie_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pet_size_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
    }

}
