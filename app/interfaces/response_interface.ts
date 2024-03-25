export interface IResponse {
    code: number
    status: string
    message?: string
    result?: any
    errors?: any
}