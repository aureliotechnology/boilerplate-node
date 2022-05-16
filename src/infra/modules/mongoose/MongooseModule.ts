import { IAppConfig } from '@crosscutting/AppConfig'
import TYPES from '@crosscutting/Types'
import IPersonalAccountRepo from '@domain/account/repo/IPersonalAccountRepo'
import { IModule } from '@modules/ddd-hex-ca-module/src'

import { Container, inject, injectable } from 'inversify'
import { connect, set } from 'mongoose'
import PersonalAccountRepo from './account/repos/PersonalAccountRepo'


@injectable()
export default class MongooseModule implements IModule {
  private container: Container
  private appConfig: IAppConfig

  constructor(@inject(TYPES.Container) container: Container, @inject(TYPES.IAppConfig) appConfig: IAppConfig) {
    this.container = container
    this.appConfig = appConfig
    this.IoC()
  }

  IoC(): void {
    this.container.bind<IPersonalAccountRepo>(TYPES.IPersonalAccountRepo).to(PersonalAccountRepo).whenTargetNamed('PersonalAccount')
  }

  configureServices(): void {
    return
  }

  async start(): Promise<void> {
    set('debug', true)
    try {
      await connect(this.appConfig.MONGO_URL)
    } catch (error) {
      console.error('MONGOOSE_MODULE', error)
    }
  }

  stop(): void | Promise<void> {
    throw new Error('Method not implemented.')
  }
}
