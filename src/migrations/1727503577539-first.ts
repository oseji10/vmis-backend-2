import { MigrationInterface, QueryRunner } from "typeorm";

export class First1727503577539 implements MigrationInterface {
    name = 'First1727503577539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hospital" ("id" SERIAL NOT NULL, "hospitalName" character varying(100) NOT NULL, "location" character varying, "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalAdminId" integer, CONSTRAINT "REL_134da00c1ab58432cdb38fe411" UNIQUE ("hospitalAdminId"), CONSTRAINT "PK_10f19e0bf17ded693ea0da07d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "stateName" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "disease" ("id" SERIAL NOT NULL, "diseaseName" character varying(100) NOT NULL, "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f7a8573a47cdc044735eda4644b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "gender" character varying, "dateOfBirth" TIMESTAMP, "maritalStatus" character varying, "hospitalFileNumber" character varying, "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "stateOfOriginId" integer, "stateOfResidenceId" integer, "diseaseTypeId" integer, "hospitalId" integer, "addedById" integer, CONSTRAINT "REL_03882131e9f3c79dc470dec4fe" UNIQUE ("addedById"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "phoneNumber" character varying(11) NOT NULL, "status" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hospital" ADD CONSTRAINT "FK_134da00c1ab58432cdb38fe4112" FOREIGN KEY ("hospitalAdminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_c0abd6e166b25272d95f615aede" FOREIGN KEY ("stateOfOriginId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_874ae61a02c0eed6f18905935a9" FOREIGN KEY ("stateOfResidenceId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_244b843d67086d942be55a32f10" FOREIGN KEY ("diseaseTypeId") REFERENCES "disease"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_da65d1381ddb43e17dbf9c3c43e" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_03882131e9f3c79dc470dec4fe9" FOREIGN KEY ("addedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_03882131e9f3c79dc470dec4fe9"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_da65d1381ddb43e17dbf9c3c43e"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_244b843d67086d942be55a32f10"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_874ae61a02c0eed6f18905935a9"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_c0abd6e166b25272d95f615aede"`);
        await queryRunner.query(`ALTER TABLE "hospital" DROP CONSTRAINT "FK_134da00c1ab58432cdb38fe4112"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "disease"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "hospital"`);
    }

}
