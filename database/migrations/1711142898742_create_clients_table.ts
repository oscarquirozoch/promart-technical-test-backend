import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', { useBinaryUuid: false }).primary()
      table.string('name', 40)
      table.string('surname', 40)
      table.string('mothers_surname', 40).nullable()
      table.string('email').unique()
      table.date('birthdate')
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}