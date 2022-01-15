import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationTest1642284263934 implements MigrationInterface {
    name = 'MigrationTest1642284263934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" RENAME COLUMN "enrolled" TO "isEnrolled"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" RENAME COLUMN "isEnrolled" TO "enrolled"`);
    }

}
