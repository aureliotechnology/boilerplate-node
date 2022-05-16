import TYPES from '@crosscutting/Types'
import PersonalAccount from '@domain/account/entities/PersonalAccount'
import IPersonalAccountRepo from '@domain/account/repo/IPersonalAccountRepo'
import { IUseCase } from '@modules/ddd-hex-ca-module/src'
import { inject, injectable, named } from 'inversify'

@injectable()
export default class GetPersonalAccountByIdUC implements IUseCase<string, PersonalAccount> {
  public constructor(
    @inject(TYPES.IPersonalAccountRepo) @named('PersonalAccount') private readonly personalAccountRepo: IPersonalAccountRepo
  ) {}

  async execute(personalAccountId: string): Promise<PersonalAccount> {    
    return this.personalAccountRepo.findById(personalAccountId) as Promise<PersonalAccount>
  }
}
