import { MigrationInterface, QueryRunner } from "typeorm";

export class First1728058303547 implements MigrationInterface {
    name = 'First1728058303547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestID" character varying NOT NULL, "status" character varying DEFAULT 'pending fulfilment', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalId" uuid, CONSTRAINT "PK_5506a27af07576d91f86d6202ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_request_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestID" character varying NOT NULL, "quantityRequested" integer, "requestedDate" TIMESTAMP WITH TIME ZONE, "quantityDispatched" integer, "dispatchedDate" TIMESTAMP WITH TIME ZONE, "receivedQuantity" integer, "receivedDate" TIMESTAMP WITH TIME ZONE, "expiryDate" TIMESTAMP WITH TIME ZONE, "status" character varying DEFAULT 'active', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "productRequestId" uuid, "productId" uuid, "requestedById" uuid, "dispatchedById" uuid, "receivedById" uuid, CONSTRAINT "PK_9a60ff45dcaa7f316ef1b80bf56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_request" ADD CONSTRAINT "FK_29ff3daf97cb3db89b87d9eaaff" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_449f282429c4c902cb55f5e9d89" FOREIGN KEY ("productRequestId") REFERENCES "product_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_5b454d0cf96f36b966c32fb2ff1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_cd4c604d3ea422c40b51a937cfe" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_4785089d574194eaac53e635a2d" FOREIGN KEY ("dispatchedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_2f0ea1c5b1e32f71fd10252950a" FOREIGN KEY ("receivedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_2f0ea1c5b1e32f71fd10252950a"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_4785089d574194eaac53e635a2d"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_cd4c604d3ea422c40b51a937cfe"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_5b454d0cf96f36b966c32fb2ff1"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_449f282429c4c902cb55f5e9d89"`);
        await queryRunner.query(`ALTER TABLE "product_request" DROP CONSTRAINT "FK_29ff3daf97cb3db89b87d9eaaff"`);
        await queryRunner.query(`DROP TABLE "product_request_items"`);
        await queryRunner.query(`DROP TABLE "product_request"`);
    }

}
