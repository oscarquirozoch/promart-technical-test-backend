export interface ILog {
    request_id?: string,
    code: number
    status: string
    message?: string
    result?: any
    error?: any,
    errors?: any,
    trace?: any
}