import PersonalAccount from '@domain/account/entities/PersonalAccount'
import { Mapper } from '@modules/ddd-hex-ca-module/src'

export class PersonalAccountMapper extends Mapper<PersonalAccount> {
  constructor() {
    super(PersonalAccount, [
      {
        target: PersonalAccount,
        properties: {
          
        },
      },
    ])
  }
}
