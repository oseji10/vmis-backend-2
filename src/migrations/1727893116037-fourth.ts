import { MigrationInterface, QueryRunner } from "typeorm";

export class Fourth1727893116037 implements MigrationInterface {
    name = 'Fourth1727893116037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacist" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmacist" DROP COLUMN "gender"`);
    }

}
