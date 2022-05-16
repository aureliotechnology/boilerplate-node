import { AggregateRoot } from '@modules/ddd-hex-ca-module/src'
import AccountType from '../enums/AccountType'

export default abstract class Account extends AggregateRoot<string>  {
  id: string
  type: AccountType

  constructor(type: AccountType) {
    super()
    this.id = ''
    this.type = type
  }
}
