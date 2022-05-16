import TYPES from '@crosscutting/Types'
import { inject, injectable, named } from 'inversify'

import PersonalAccount from '../entities/PersonalAccount'
import IPersonalAccountRepo from '../repo/IPersonalAccountRepo'

@injectable()
export default class PersonalAccountSrv {
  constructor(@inject(TYPES.IPersonalAccountRepo) @named('PersonalAccount') private readonly personalAccountRepo: IPersonalAccountRepo) {}

  async create(
    name: string,    
    email: string,
    birthdate: Date,
  ): Promise<PersonalAccount> {    
    const personalAccount = PersonalAccount.create(name, email, birthdate)
    return this.personalAccountRepo.insert(personalAccount) as Promise<PersonalAccount>
  }
}
