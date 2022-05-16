import { IAppConfig } from '@crosscutting/AppConfig'

import TYPES from '@crosscutting/Types'
import cors from '@koa/cors'
import { IModule } from '@modules/ddd-hex-ca-module/src'
import { Container, inject, injectable } from 'inversify'
import serve from 'koa-static'
import { Action, ClassConstructor, createKoaServer, IocAdapter, useContainer } from 'routing-controllers'
import AccountController from './controllers/AccountController'
import OpenApiController from './controllers/OpenApiController'
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware'

@injectable()
export default class KoaModule implements IModule, IocAdapter {
  private app: any
  private container: Container

  constructor(
    @inject(TYPES.Container) container: Container,
    @inject(TYPES.IAppConfig) private readonly appConfig: IAppConfig,    
  ) {    
    this.container = container

    this.app = createKoaServer({
      cors: true,
      controllers: [
        AccountController,
        OpenApiController,
      ],
      defaultErrorHandler: false,
      middlewares: [ErrorHandlerMiddleware],
      async authorizationChecker(action: Action, roles: string[]) {
        return true
      },
      async currentUserChecker(action: Action) {
        return true
      },
    })

    this.app.use(
      cors({
        origin: '*',
        exposeHeaders: 'Access-Control-Allow-Origin',
      }),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    return this.container.resolve<T>(someClass)
  }

  configureServices(): void {
    useContainer(this)
  }

  start(): void {
    if (this.appConfig.ENV === 'local') {
      this.app.use(serve(__dirname + '/static'))
      this.app.listen(3000)
      console.log('Server on http://localhost:3000/swagger')
    }
  }

  stop(): void | Promise<void> {
    throw new Error('Method not implemented.')
  }

  getApp(): any {
    return this.app
  }
}
