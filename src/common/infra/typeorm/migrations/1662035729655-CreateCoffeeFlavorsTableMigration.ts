import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCoffeeFlavorsTableMigration1662035729655
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coffees_flavors',
        columns: [
          {
            name: 'coffee_id',
            type: 'int',
          },
          {
            name: 'flavor_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'coffees_flavors',
      new TableForeignKey({
        columnNames: ['coffee_id'],
        referencedTableName: 'coffees',
        referencedColumnNames: ['id'],
        name: 'coffees',
      }),
    );

    await queryRunner.createForeignKey(
      'coffees_flavors',
      new TableForeignKey({
        columnNames: ['flavor_id'],
        referencedTableName: 'flavors',
        referencedColumnNames: ['id'],
        name: 'flavors',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('coffees_flavors', 'flavors');
    await queryRunner.dropForeignKey('coffees_flavors', 'coffees');
    await queryRunner.dropTable('coffees_flavors');
  }
}
