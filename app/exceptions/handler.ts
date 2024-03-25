import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors as vineErrors } from '@vinejs/vine'
import { HTTP } from '../constants/http_constants.js';
import { ResponseHelper } from '../helpers/response_helper.js';
import NotFoundException from './not_found_exception.js';
import logger from '@adonisjs/core/services/logger'
import { LogHelper } from '../helpers/log_helper.js';

export default class HttpExceptionHandler extends ExceptionHandler {

  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    const response = new ResponseHelper(ctx);

    if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      response
        .code(HTTP.UNPROCESSABLE_CONTENT.CODE)
        .status(HTTP.UNPROCESSABLE_CONTENT.STATUS)
        .message('Error de validación')
        .errors(error.messages)
        .resolve()
      return
    }

    if (error instanceof NotFoundException) {
      response
        .code(HTTP.NOT_FOUND.CODE)
        .status(HTTP.NOT_FOUND.STATUS)
        .message(error.message ?? 'Recurso no encontrado')
        .resolve()
      return
    }

    if (error?.code === 'ER_DUP_ENTRY' && error?.errno === 1062 && error?.sqlState === '23000') {
      response
        .code(HTTP.CONFLICT.CODE)
        .status(HTTP.CONFLICT.STATUS)
        .message('Hay datos que ya se encuentran registrados')
        .errors(error.messages)
        .resolve()
      return
    }

    if (
      (error?.code === 'ER_BAD_DB_ERROR' && error?.errno === 1049 && error?.sqlState === '42000') ||
      (error?.errno === -4078 && error?.code === 'ECONNREFUSED')
    ) {
      response
        .code(HTTP.INTERNAL_SERVER_ERROR.CODE)
        .status(HTTP.INTERNAL_SERVER_ERROR.STATUS)
        .resolve()
      return
    }

    if (error?.code === 'E_ROUTE_NOT_FOUND' && error?.status === 404) {
      response
        .code(HTTP.NOT_FOUND.CODE)
        .status(HTTP.NOT_FOUND.STATUS)
        .message('Recurso no encontrado')
        .resolve()
      return
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: any, ctx: HttpContext) {

    const log = new LogHelper();
    log.error(error ?? {})

    if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      log
        .code(HTTP.UNPROCESSABLE_CONTENT.CODE)
        .status(HTTP.UNPROCESSABLE_CONTENT.STATUS)
        .message('Error de validación')
        .errors(error.messages)
      logger.error(log.resolve(), 'Something went wrong')
      return
    }

    if (error instanceof NotFoundException) {
      log
        .code(HTTP.NOT_FOUND.CODE)
        .status(HTTP.NOT_FOUND.STATUS)
        .message(error.message ?? 'Recurso no encontrado')
      logger.error(log.resolve(), 'Something went wrong')
      return
    }

    if (error?.code === 'ER_DUP_ENTRY' && error?.errno === 1062 && error?.sqlState === '23000') {
      log
        .code(HTTP.CONFLICT.CODE)
        .status(HTTP.CONFLICT.STATUS)
        .message('Hay datos que ya se encuentran registrados')
        .errors(error.messages)
        .error(error.sqlMessage)
      logger.error(log.resolve(), 'Something went wrong')
      return
    }

    if (
      (error?.code === 'ER_BAD_DB_ERROR' && error?.errno === 1049 && error?.sqlState === '42000') ||
      (error?.errno === -4078 && error?.code === 'ECONNREFUSED')
    ) {
      log
        .code(HTTP.INTERNAL_SERVER_ERROR.CODE)
        .status(HTTP.INTERNAL_SERVER_ERROR.STATUS)
      logger.error(log.resolve(), 'Something went wrong')
      return
    }

    if (error?.code === 'E_ROUTE_NOT_FOUND' && error?.status === 404) {
      log
        .code(HTTP.NOT_FOUND.CODE)
        .status(HTTP.NOT_FOUND.STATUS)
        .message('Recurso no encontrado')
      logger.error(log.resolve(), 'Something went wrong')
      return
    }

    logger.error({ error }, 'Something went wrong')
    return super.report(error, ctx)
  }
}
