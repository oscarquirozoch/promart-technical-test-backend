import { HttpContext } from "@adonisjs/core/http"
import { IResponse } from "../interfaces/response_interface.js"

export class ResponseHelper {

    private _code: number = 200
    private _status: string = 'OK'
    private _message: string = ''
    private _result: any = null
    private _errors: any = null

    private _context: HttpContext

    constructor(ctx: HttpContext) {
        this._context = ctx
    }

    code(value: number): this {
        this._code = value
        return this
    }

    status(value: string): this {
        this._status = value
        return this
    }

    message(value: string): this {
        this._message = value
        return this
    }

    result(value: any): this {
        this._result = value
        return this
    }

    errors(value: any): this {
        this._errors = value
        return this
    }

    resolve() {
        let response: IResponse = {
            code: this._code,
            status: this._status
        }

        if (this._message !== '') response.message = this._message
        if (this._result !== null) response.result = this._result
        if (this._errors !== null) response.errors = this._errors

        this._context.response.status(this._code).send(response)
    }
}