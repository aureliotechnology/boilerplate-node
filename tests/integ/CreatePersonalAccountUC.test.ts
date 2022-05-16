import 'dotenv/config'

import { setupServer } from '@api/Server'
import mongoose from 'mongoose'
import TYPES from '@crosscutting/Types'

import { dropAllCollections } from '@tests/_helpers/database'
import { Container } from 'inversify'
import CreatePersonalAccountUC from '@app/account/CreatePersonalAccountUC'
import PersonalAccountSrv from '@domain/account/services/PersonalAccountSrv'
import { AccountPayloadBuilder } from '@tests/_fixture/builder/payload'
import PersonalAccount from '@domain/account/entities/PersonalAccount'

describe('UseCase', () => {
  let server: any
  let serviceContainer: Container
  beforeAll(async () => {
    const setupServerInstance: any = await setupServer()
    server = setupServerInstance.server
    await server.run()
    serviceContainer = setupServerInstance.container
  })

  beforeEach(async () => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
    await dropAllCollections()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('Account', () => {
    test('When invalid input passed, then it should return errors in errors property', async () => {
      const sut = serviceContainer.get<CreatePersonalAccountUC>(TYPES.CreatePersonalAccountUC)

      const resultUC = await sut.execute({} as any)

      expect(resultUC).toHaveProperty('errors')
    })

    test('When valid input passed, then it should return account', async () => {
      const input = AccountPayloadBuilder.new().build()
      const sut = serviceContainer.get<CreatePersonalAccountUC>(TYPES.CreatePersonalAccountUC)

      const resultUC = await sut.execute(input)

      expect(resultUC).toBeInstanceOf(PersonalAccount)
    })
  })
})
