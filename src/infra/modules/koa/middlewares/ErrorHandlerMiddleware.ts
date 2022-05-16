import ILogger from '@crosscutting/adapters/logger/ILogger'
import TYPES from '@crosscutting/Types'
import { DomainEvent, DomainException } from '@modules/ddd-hex-ca-module/src'
import { ValidationError } from 'class-validator'
import { inject, injectable } from 'inversify'
import Koa from 'koa'
import { BadRequestError, KoaMiddlewareInterface, Middleware } from 'routing-controllers'

enum HttpClientError {
  BAD_REQUEST = 'BadRequestError',
  UNAUTHORIZED = 'UnauthorizedError',
  NOT_FOUND = 'NotFoundError',
}


@injectable()
@Middleware({ type: 'before' })
export default class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) { }

  async use(context: Koa.Context, next: (err?: any) => Promise<any>): Promise<any> {
    try {
      this.logger.info(JSON.stringify(context))
      return await next()
    } catch (ex: any) {
      if (ex instanceof DomainException) {
        console.log('Domain Exception')
      }
      if (ex instanceof BadRequestError) {
        if (ex.hasOwnProperty('errors')) { // Validation error

          console.log('Has erros proprs')
        }
      }
      if (ex instanceof ValidationError) {
        throw Error("Not implemented exception")
      }
      const body = JSON.parse(JSON.stringify(ex, ['name', 'errorCode', 'message', 'errors']))

      if (this.isClientError(ex)) {
        // Domain Exception
        this.logger.warning(ex)
        context.response.body = {
          ...body,
          errors: JSON.parse(JSON.stringify(ex.errors))
        }
        context.response.status = 400
      } else if (ex.name === HttpClientError.UNAUTHORIZED) {
        this.logger.warning(ex)
        context.response.body = body
        context.response.status = 401
      } else if (ex.name === HttpClientError.NOT_FOUND) {
        this.logger.warning(ex)
        context.response.body = body
        context.response.status = 404
      } else {
        this.logger.warning(ex)
        context.response.status = 500
      }
    }
  }

  isClientError(ex: any) {
    return ex.hasOwnProperty('errorCode') || ex.name === HttpClientError.BAD_REQUEST || ex.hasOwnProperty('errors')
  }
}
