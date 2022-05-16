import CreatePersonalAccountUC from '@app/account/CreatePersonalAccountUC'
import GetPersonalAccountByIdUC from '@app/account/GetPersonalAccountByIdUC'
import PersonalAccountSrv from '@domain/account/services/PersonalAccountSrv'
import PersonalAccountRepo from '@modules/mongoose/account/repos/PersonalAccountRepo'
import { ConsoleEventBus, IEventBus } from '@modules/ddd-hex-ca-module/src'
import { Container } from 'inversify'
import ILogger from './adapters/logger/ILogger'
import LoggerAdapter from './adapters/logger/LoggerAdapter'
import TYPES from './Types'

export default class IoC {
  private container: Container

  constructor(container: Container = new Container({ skipBaseClassChecks: true, autoBindInjectable: true })) {
    this.container = container
  }
  
  public build(): Container {

    // General
    this.container.bind<IEventBus>(TYPES.IEventBus).to(ConsoleEventBus)

    // Use cases
    this.container.bind<CreatePersonalAccountUC>(TYPES.CreatePersonalAccountUC).to(CreatePersonalAccountUC)
    this.container.bind<GetPersonalAccountByIdUC>(TYPES.GetPersonalAccountByIdUC).to(GetPersonalAccountByIdUC)
    
    // Domain Services
    this.container.bind<PersonalAccountSrv>(TYPES.PersonalAccountSrv).to(PersonalAccountSrv)

    // Adapters
    this.container.bind<ILogger>(TYPES.ILogger).to(LoggerAdapter)
    
    return this.container
  }
}