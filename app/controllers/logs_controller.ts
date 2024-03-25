import type { HttpContext } from '@adonisjs/core/http'
import { readFileSync } from 'fs'

export default class LogsController {

    async show({ response }: HttpContext) {
        try {
            const logContent = readFileSync('logs/app.log.1', 'utf8')
            return response.json(logContent)
        } catch (error) {
            return response.status(500).send('Error al leer el archivo de logs')
        }
    }
}