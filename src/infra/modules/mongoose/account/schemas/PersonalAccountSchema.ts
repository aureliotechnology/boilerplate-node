import PersonalAccount from '@domain/account/entities/PersonalAccount'
import AccountType from '@domain/account/enums/AccountType'
import { PersonalAccountMapper } from '../mappers/PersonalAccountMapper'
import { Schema } from 'mongoose'

const PersonalAccountSchema = new Schema<PersonalAccount>(
  {
    id: String,
    name: String,
    email: String,
    birthdate: Date,
    type: { type: String, enum: Object.values(AccountType) },
  },
  {
    collection: 'accounts',
    toObject: {
      transform: function (doc, _ret) {
        const mapper = new PersonalAccountMapper()
        const result = mapper.map(doc)

        result.id = doc._id.toString()
        return result
      },
    },
  },
)

export default PersonalAccountSchema
