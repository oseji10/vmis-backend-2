import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1728187268646 implements MigrationInterface {
    name = 'Third1728187268646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "manufacturer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortName" character varying NOT NULL, "manufacturerName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "status" character varying DEFAULT 'active', "contactPersonId" uuid, CONSTRAINT "REL_a5223979a4dfb1a009395a3325" UNIQUE ("contactPersonId"), CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD CONSTRAINT "FK_a5223979a4dfb1a009395a33253" FOREIGN KEY ("contactPersonId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_da883f8d02581a40e6059bd7b38" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pricelist" ADD CONSTRAINT "FK_7b02070e6d5eddc6a5c0c559f27" FOREIGN KEY ("manufacturerIdId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricelist" DROP CONSTRAINT "FK_7b02070e6d5eddc6a5c0c559f27"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_da883f8d02581a40e6059bd7b38"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP CONSTRAINT "FK_a5223979a4dfb1a009395a33253"`);
        await queryRunner.query(`DROP TABLE "manufacturer"`);
    }

}
