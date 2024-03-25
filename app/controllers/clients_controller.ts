import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core';

import NotFoundException from '#exceptions/not_found_exception';

import { ResponseHelper } from '../helpers/response_helper.js';
import { HTTP } from '../constants/http_constants.js';
import ClientsService from '#services/clients_service';
import { createClientValidator, listClientsValidator, updateClientValidator } from '#validators/client';
import { idValidator } from '#validators/general';

import { IListClients } from '../interfaces/list_clients_interface.js';

@inject()
export default class ClientsController {

    constructor(
        private _clientsService: ClientsService
    ) { }

    async show(ctx: HttpContext) {
        const response = new ResponseHelper(ctx)

        const params = await idValidator.validate(ctx.request.params())
        const clientResponse = await this._clientsService.show(params.id)

        if (!clientResponse) throw new NotFoundException('Cliente no encontrado')

        response
            .code(HTTP.OK.CODE)
            .status(HTTP.OK.STATUS)
            .result(clientResponse)
            .resolve()

    }

    async list(ctx: HttpContext) {
        const response = new ResponseHelper(ctx)

        const params = await ctx.request.validateUsing(listClientsValidator);
        const clientResponse = await this._clientsService.list(params as IListClients)

        response
            .code(HTTP.OK.CODE)
            .status(HTTP.OK.STATUS)
            .result(clientResponse)
            .resolve()
    }

    async create(ctx: HttpContext) {
        const response = new ResponseHelper(ctx)

        const payload = await ctx.request.validateUsing(createClientValidator)
        const clientResponse = await this._clientsService.create(payload)

        response
            .code(HTTP.CREATED.CODE)
            .status(HTTP.CREATED.STATUS)
            .result(clientResponse)
            .resolve()
    }

    async update(ctx: HttpContext) {
        const response = new ResponseHelper(ctx)

        const params = await idValidator.validate(ctx.request.params())
        const payload = await ctx.request.validateUsing(updateClientValidator)
        const clientResponse = await this._clientsService.update(params.id, payload)

        if (!clientResponse) throw new NotFoundException('Cliente no encontrado')

        response
            .code(HTTP.OK.CODE)
            .status(HTTP.OK.STATUS)
            .result(clientResponse)
            .resolve()
    }

    async delete(ctx: HttpContext) {
        const response = new ResponseHelper(ctx)

        const params = await idValidator.validate(ctx.request.params())
        const clientResponse = await this._clientsService.delete(params.id)

        if (!clientResponse) throw new NotFoundException('Cliente no encontrado')

        response
            .code(HTTP.OK.CODE)
            .status(HTTP.OK.STATUS)
            .result(clientResponse)
            .resolve()
    }

}