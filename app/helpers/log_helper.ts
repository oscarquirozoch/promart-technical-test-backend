import { ILog } from "../interfaces/log_interface.js"

export class LogHelper {

    private _request_id: string = ''
    private _code: number = 200
    private _status: string = 'OK'
    private _message: string = ''
    private _result: any = null
    private _errors: any = null
    private _error: any = null
    private _trace: any = null

    requestId(value: string): this {
        this._request_id = value
        return this
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

    error(value: any): this {
        this._error = value
        return this
    }

    trace(value: any): this {
        this._trace = value
        return this
    }

    resolve() {
        let response: ILog = {
            code: this._code,
            status: this._status
        }

        if (this._request_id !== '') response.request_id = this._request_id
        if (this._message !== '') response.message = this._message
        if (this._result !== null) response.result = this._result
        if (this._errors !== null) response.errors = this._errors
        if (this._error !== null) response.error = this._error
        if (this._trace !== null) response.trace = this._trace

        return response
    }
}