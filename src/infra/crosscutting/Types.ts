const TYPES = {

  // General
  Container: Symbol.for('Container'),
  IAppConfig: Symbol.for('IAppConfig'),
  IEventBus: Symbol.for('IEventBus'),

  // Use cases
  CreatePersonalAccountUC: Symbol.for('CreatePersonalAccountUC'),
  GetPersonalAccountByIdUC: Symbol.for('GetPersonalAccountByIdUC'),

  // Domain Services
  PersonalAccountSrv: Symbol.for('PersonalAccountSrv'),

  // Repositories
  IPersonalAccountRepo: Symbol.for('IPersonalAccountRepo'),

  // Adapters
  ILogger: Symbol.for('ILogger'),

  // Validator
  IValidator: Symbol.for('IValidator')
}

export default TYPES