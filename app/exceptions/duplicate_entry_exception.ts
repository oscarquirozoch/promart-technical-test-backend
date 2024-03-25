import { Exception } from '@adonisjs/core/exceptions'

export default class DuplicateEntryException extends Exception {

    message: string = 'DUPLICATE ENTRY'
    status: number = 400

    constructor(
        message: string,
        status: number = 400
    ) {
        super(message, { status: status })
        this.message = message
        this.status = status
    }

}