import Client from "#models/client";
import { ICreateClient } from "../interfaces/create_client_interface.js";
import { IListClients } from "../interfaces/list_clients_interface.js";
import { IUpdateClient } from "../interfaces/update_client_interface.js";
import db from '@adonisjs/lucid/services/db'

export default class ClientsService {

    async show(id: string) {
        const client = await db.from('clients')
            .select(
                'id',
                'name',
                'surname',
                db.raw('mothers_surname AS mothers_surname'),
                'email',
                db.raw('(SELECT DATE_FORMAT(birthdate, "%d-%m-%Y")) AS birthdate'),
                db.raw(`CONCAT(
                    FLOOR(TIMESTAMPDIFF(DAY, birthdate, CURDATE()) / 365), ' años, ',
                    FLOOR((TIMESTAMPDIFF(DAY, birthdate, CURDATE()) % 365) / 30), ' meses, ',
                    (TIMESTAMPDIFF(DAY, birthdate, CURDATE()) % 365) % 30, ' días'
                  ) AS age`),
                db.raw('(SELECT DATE_FORMAT(created_at, "%d-%m-%Y")) AS created_at')
            )
            .where('id', id)
            .first()

        if (!client) return null;

        return client;
    }

    async list(args: IListClients) {
        const query = db.from('clients')

        if (args.id && args.id !== '') query.andWhere('id', args.id)
        if (args.name && args.name !== '') query.andWhere('name', 'like', `%${args.name}%`)
        if (args.surname && args.surname !== '') query.andWhere('surname', 'like', `%${args.surname}%`)

        query.select(
            'id',
            'name',
            'surname',
            db.raw('mothers_surname AS mothers_surname'),
            'email',
            db.raw('(SELECT DATE_FORMAT(birthdate, "%d-%m-%Y")) AS birthdate'),
            db.raw('(SELECT DATE_FORMAT(created_at, "%d-%m-%Y")) AS created_at'),
        )

        const clients = await query.paginate(args.page, args.per_page);

        return clients
    }

    async create(data: ICreateClient) {

        const client = new Client()

        client.name = data.name
        client.surname = data.surname
        client.mothers_surname = data.mothers_surname
        client.email = data.email
        client.birthdate = data.birthdate

        await client.save()

        return client.$attributes;
    }

    async update(id: string, data: IUpdateClient) {
        const client = await Client.find(id)

        if (!client) return null

        client.merge(data)

        await client.save()
        return client
    }

    async delete(id: string) {
        const client = await Client.find(id)

        if (!client) return null

        await client.delete()

        return client
    }

}