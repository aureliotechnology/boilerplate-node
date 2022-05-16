import faker from 'faker'

const convertToDateString = (data: Date) => {
  const ano = data.getFullYear()
  const mes = `${data.getMonth() + 1}`.padStart(2, '0')
  const dia = `${data.getUTCDate()}`.padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

interface IAccountPayload {
  name: string
  email: string
  birthdate: string
}

export default class AccountPayloadBuilder {
  payload: IAccountPayload

  constructor() {
    this.payload = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      birthdate: convertToDateString(faker.date.past(faker.datatype.number({ min: 18, max: 65 }))),
    }
  }

  public static new(): AccountPayloadBuilder {
    return new AccountPayloadBuilder()
  }


  public withEmptyName(): AccountPayloadBuilder {
    this.payload.name = ''
    return this
  }

  public withCustomName(name: string): AccountPayloadBuilder {
    this.payload.name = name
    return this
  }

  public withEmptyEmail(): AccountPayloadBuilder {
    this.payload.email = ''
    return this
  }

  public withInvalidEmail(): AccountPayloadBuilder {
    this.payload.email = faker.random.alpha()
    return this
  }

  public withCustomEmail(email: string): AccountPayloadBuilder {
    this.payload.email = email
    return this
  }


  public withCustomDate(birthdate: string): AccountPayloadBuilder {
    this.payload.birthdate = birthdate
    return this
  }

  public build(): IAccountPayload {
    return this.payload
  }
}
