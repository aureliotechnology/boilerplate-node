import PersonalAccount from '@domain/account/entities/PersonalAccount'
import faker from 'faker'

export default class PersonalAccountBuilder {
  //Account
  private ownerId: string
  private id: string

  //Personal Account
  private name: string
  private birthdate: Date
  private email: string
  private phone: string

  constructor() {
    this.name = faker.name.findName()
    this.birthdate = faker.date.past(faker.datatype.number({ min: 18, max: 65 }))
    this.email = faker.internet.email()
  }

  public static new(): PersonalAccountBuilder {
    return new PersonalAccountBuilder()
  }

  public build(): PersonalAccount {
    return PersonalAccount.create(this.name, this.ownerId, this.birthdate)
  }
}
