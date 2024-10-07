import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1728186945137 implements MigrationInterface {
    name = 'Second1728186945137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "otherNames" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userIdId" uuid, CONSTRAINT "REL_c0468f557dc6375360af52c0f7" UNIQUE ("userIdId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hospital" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortName" character varying, "hospitalName" character varying NOT NULL, "location" character varying, "status" character varying DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalAdminId" uuid, CONSTRAINT "REL_134da00c1ab58432cdb38fe411" UNIQUE ("hospitalAdminId"), CONSTRAINT "PK_10f19e0bf17ded693ea0da07d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "otherNames" character varying, "gender" character varying, "dateOfBirth" date, "maritalStatus" character varying, "hospitalFileNumber" character varying, "status" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userId" uuid, "stateOfOriginId" uuid, "stateOfResidenceId" uuid, "diseaseTypeId" uuid, "hospitalId" uuid, "addedById" uuid, CONSTRAINT "REL_6636aefca0bdad8933c7cc3e39" UNIQUE ("userId"), CONSTRAINT "REL_03882131e9f3c79dc470dec4fe" UNIQUE ("addedById"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manufacturer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortName" character varying NOT NULL, "manufacturerName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "status" character varying DEFAULT 'active', "contactPersonId" uuid, CONSTRAINT "REL_a5223979a4dfb1a009395a3325" UNIQUE ("contactPersonId"), CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortName" character varying NOT NULL, "productName" character varying NOT NULL, "productDescription" character varying NOT NULL, "formulation" character varying NOT NULL, "status" character varying DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "supplierId" uuid, "manufacturerId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortName" character varying NOT NULL, "supplierName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "status" character varying DEFAULT 'active', "contactPersonId" uuid, CONSTRAINT "REL_8069d1732643108692c5f1bfa1" UNIQUE ("contactPersonId"), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_request_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestID" character varying NOT NULL, "quantityRequested" integer, "requestedDate" TIMESTAMP WITH TIME ZONE, "quantityDispatched" integer, "dispatchedDate" TIMESTAMP WITH TIME ZONE, "quantityReceived" integer, "receivedDate" TIMESTAMP WITH TIME ZONE, "batchNumber" character varying, "expiryDate" TIMESTAMP WITH TIME ZONE, "status" character varying DEFAULT 'requested', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "productRequestId" uuid, "productId" uuid, "requestedById" uuid, "dispatchedById" uuid, "receivedById" uuid, CONSTRAINT "PK_9a60ff45dcaa7f316ef1b80bf56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestID" character varying NOT NULL, "status" character varying DEFAULT 'pending fulfilment', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "hospitalId" uuid, CONSTRAINT "PK_5506a27af07576d91f86d6202ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requestID" character varying NOT NULL, "batchNumber" character varying NOT NULL, "quantityReceived" integer NOT NULL, "quantitySold" integer, "quantityExpired" integer, "quantityRetrieved" integer, "quantityDamaged" integer, "expiryDate" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "productRequestId" uuid, "receivedById" uuid, CONSTRAINT "REL_51cb0d6440b2f2d8c7dabb20b7" UNIQUE ("receivedById"), CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pricelist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pricelistId" character varying NOT NULL, "pricelistName" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'inactive', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "supplierIdId" uuid, "manufacturerIdId" uuid, CONSTRAINT "PK_2ae09574182aa8ed4de3ae2009c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pricelist_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "landedCost" integer, "hospitalMarkup" integer, "supplierMarkup" integer, "consultantMarkup" integer, "bankCharges" integer, "otherCharges" integer, "discountCode" character varying, "status" character varying DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "pricelistId" uuid, "productIdId" uuid, "uploadedById" uuid, CONSTRAINT "PK_d0ccfe4f62245c15650904a1b8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pharmacist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "otherNames" character varying NOT NULL, "gender" character varying, "roleId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userIdId" uuid, "hospitalIdId" uuid, CONSTRAINT "REL_03d6b51b7601d7712c37f755a4" UNIQUE ("userIdId"), CONSTRAINT "REL_a9c7d82e3ed4dcbd7be6013bc0" UNIQUE ("hospitalIdId"), CONSTRAINT "PK_236fcaf7e1f860652c7db179295" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_c0468f557dc6375360af52c0f76" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospital" ADD CONSTRAINT "FK_134da00c1ab58432cdb38fe4112" FOREIGN KEY ("hospitalAdminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_c0abd6e166b25272d95f615aede" FOREIGN KEY ("stateOfOriginId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_874ae61a02c0eed6f18905935a9" FOREIGN KEY ("stateOfResidenceId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_244b843d67086d942be55a32f10" FOREIGN KEY ("diseaseTypeId") REFERENCES "disease"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_da65d1381ddb43e17dbf9c3c43e" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_03882131e9f3c79dc470dec4fe9" FOREIGN KEY ("addedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD CONSTRAINT "FK_a5223979a4dfb1a009395a33253" FOREIGN KEY ("contactPersonId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_da883f8d02581a40e6059bd7b38" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_8069d1732643108692c5f1bfa12" FOREIGN KEY ("contactPersonId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_449f282429c4c902cb55f5e9d89" FOREIGN KEY ("productRequestId") REFERENCES "product_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_5b454d0cf96f36b966c32fb2ff1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_cd4c604d3ea422c40b51a937cfe" FOREIGN KEY ("requestedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_4785089d574194eaac53e635a2d" FOREIGN KEY ("dispatchedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request_items" ADD CONSTRAINT "FK_2f0ea1c5b1e32f71fd10252950a" FOREIGN KEY ("receivedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_request" ADD CONSTRAINT "FK_29ff3daf97cb3db89b87d9eaaff" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_2db5bc1545d815391872c344777" FOREIGN KEY ("productRequestId") REFERENCES "product_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_51cb0d6440b2f2d8c7dabb20b70" FOREIGN KEY ("receivedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pricelist" ADD CONSTRAINT "FK_9e8dd9a9319be7e917ce0fe6aaa" FOREIGN KEY ("supplierIdId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pricelist" ADD CONSTRAINT "FK_7b02070e6d5eddc6a5c0c559f27" FOREIGN KEY ("manufacturerIdId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pricelist_products" ADD CONSTRAINT "FK_b3c85d2885d467b4f91f82a5b70" FOREIGN KEY ("pricelistId") REFERENCES "pricelist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pricelist_products" ADD CONSTRAINT "FK_7f7e23b5a6a1911f3e6115f1ca9" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pricelist_products" ADD CONSTRAINT "FK_b621ad9f6d008b4f1c328b92531" FOREIGN KEY ("uploadedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD CONSTRAINT "FK_03d6b51b7601d7712c37f755a42" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD CONSTRAINT "FK_a9c7d82e3ed4dcbd7be6013bc0e" FOREIGN KEY ("hospitalIdId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP CONSTRAINT "FK_a9c7d82e3ed4dcbd7be6013bc0e"`);
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP CONSTRAINT "FK_03d6b51b7601d7712c37f755a42"`);
        await queryRunner.query(`ALTER TABLE "pricelist_products" DROP CONSTRAINT "FK_b621ad9f6d008b4f1c328b92531"`);
        await queryRunner.query(`ALTER TABLE "pricelist_products" DROP CONSTRAINT "FK_7f7e23b5a6a1911f3e6115f1ca9"`);
        await queryRunner.query(`ALTER TABLE "pricelist_products" DROP CONSTRAINT "FK_b3c85d2885d467b4f91f82a5b70"`);
        await queryRunner.query(`ALTER TABLE "pricelist" DROP CONSTRAINT "FK_7b02070e6d5eddc6a5c0c559f27"`);
        await queryRunner.query(`ALTER TABLE "pricelist" DROP CONSTRAINT "FK_9e8dd9a9319be7e917ce0fe6aaa"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_51cb0d6440b2f2d8c7dabb20b70"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_2db5bc1545d815391872c344777"`);
        await queryRunner.query(`ALTER TABLE "product_request" DROP CONSTRAINT "FK_29ff3daf97cb3db89b87d9eaaff"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_2f0ea1c5b1e32f71fd10252950a"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_4785089d574194eaac53e635a2d"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_cd4c604d3ea422c40b51a937cfe"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_5b454d0cf96f36b966c32fb2ff1"`);
        await queryRunner.query(`ALTER TABLE "product_request_items" DROP CONSTRAINT "FK_449f282429c4c902cb55f5e9d89"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_8069d1732643108692c5f1bfa12"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_da883f8d02581a40e6059bd7b38"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP CONSTRAINT "FK_a5223979a4dfb1a009395a33253"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_03882131e9f3c79dc470dec4fe9"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_da65d1381ddb43e17dbf9c3c43e"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_244b843d67086d942be55a32f10"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_874ae61a02c0eed6f18905935a9"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_c0abd6e166b25272d95f615aede"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394"`);
        await queryRunner.query(`ALTER TABLE "hospital" DROP CONSTRAINT "FK_134da00c1ab58432cdb38fe4112"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_c0468f557dc6375360af52c0f76"`);
        await queryRunner.query(`DROP TABLE "pharmacist"`);
        await queryRunner.query(`DROP TABLE "pricelist_products"`);
        await queryRunner.query(`DROP TABLE "pricelist"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "product_request"`);
        await queryRunner.query(`DROP TABLE "product_request_items"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "manufacturer"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "hospital"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
