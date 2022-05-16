import Account from '../entities/Account'
import IAccountRepo from './IAccountRepo'

export type Pagination = {
  limit?: number,
  offset?: number
}

export type IFilter = Pagination & {
  name?: string
  email?: string
}
export default interface IPersonalAccountRepo extends IAccountRepo {
  all(filters: IFilter): Promise<Account[]>
}
