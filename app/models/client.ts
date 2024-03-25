import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'name' })
  declare name: string

  @column({ columnName: 'surname' })
  declare surname: string

  @column({ columnName: 'mothers_surname' })
  declare mothers_surname: string | null

  @column({ columnName: 'email' })
  declare email: string

  @column({ columnName: 'birthdate' })
  declare birthdate: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async addPrimaryKey(client: Client) {
    client.id = v4()
  }
}