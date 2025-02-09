import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739110911500 implements MigrationInterface {
    name = 'Migration1739110911500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`earthquake\` (\`id\` varchar(36) NOT NULL, \`location\` varchar(255) NOT NULL, \`magnitude\` float NOT NULL, \`date\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`earthquake\``);
    }

}
