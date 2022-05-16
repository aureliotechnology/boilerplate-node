import TYPES from '@crosscutting/Types'
import Account from '@domain/account/entities/Account'
import PersonalAccount from '@domain/account/entities/PersonalAccount'
import IPersonalAccountRepo, { IFilter } from '@domain/account/repo/IPersonalAccountRepo'
import { IEventBus, MongooseRepo } from '@modules/ddd-hex-ca-module/src'
import { inject, injectable } from 'inversify'
import { model } from 'mongoose'
import PersonalAccountSchema from '../schemas/PersonalAccountSchema'

@injectable()
export default class ContaPessoalRepo extends MongooseRepo<PersonalAccount> implements IPersonalAccountRepo {
  constructor(@inject(TYPES.IEventBus) bus: IEventBus) {
    super(model<PersonalAccount>('PersonalAccount', PersonalAccountSchema), bus)
  }

  async all(filters?: IFilter): Promise<Account[]> {
    let filter = {}
    let skip = filters?.offset || 0
    let limit = filters?.limit || 20

    if (filters?.name) {
      filter = Object.assign(filter, { name: filters.name })
    }
    if (filters?.email) {
      filter = Object.assign(filter, { email: filters.email })
    }


    const result = await this.model.find(filter).skip(skip).limit(limit)
    if (!result) {
      return []
    }

    return result.map((element: any) => element.toObject())
  }
}
