import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserEntity1682591342076 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
          new Table({
            name: 'user',
            columns: [
              {
                name: 'id',
                type: 'int4',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'login',
                type: 'varchar',
                isUnique: true,
                isNullable: false,
              },
              {
                name: 'password',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'email',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'isEmailVerified',
                type: 'boolean',
                isNullable: false,
              },
            ],
          }),
          false,
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE user');
  }

}
