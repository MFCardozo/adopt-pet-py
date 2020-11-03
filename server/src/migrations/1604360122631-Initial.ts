import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1604360122631 implements MigrationInterface {
    name = 'Initial1604360122631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "images" text array NOT NULL, "size" character varying NOT NULL, "type" character varying NOT NULL, "gender" character varying NOT NULL, "age" character varying, "phone" text NOT NULL, "vaccionations" boolean DEFAULT false, "neutered" boolean DEFAULT false, "location" text NOT NULL, "creatorId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_62dba8c894cf5abf1f4d501d973" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_62dba8c894cf5abf1f4d501d973"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
