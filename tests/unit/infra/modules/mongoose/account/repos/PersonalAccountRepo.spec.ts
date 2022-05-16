import 'dotenv/config'

import { setupServer } from '@api/Server'
import TYPES from '@crosscutting/Types'

import { Container } from 'inversify'
import ContaPessoalRepo from '@modules/mongoose/account/repos/PersonalAccountRepo'


describe('Mongoose Module', () => {
  describe('PersonalAccountRepo', () => {
    let serviceContainer: Container
    beforeAll(async () => {
      const setupServerInstance: any = await setupServer()
      serviceContainer = setupServerInstance.container
    })
    beforeEach(async () => {
      jest.restoreAllMocks()
      jest.resetAllMocks()
    })

    test('When no filters sent, then it should mount the query with default values', async () => {
      const sut = serviceContainer.getNamed<ContaPessoalRepo>(TYPES.IPersonalAccountRepo, 'PersonalAccount')
      const mockMethods = {
        find: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnValue(undefined),
      }
      Reflect.set(sut, 'model', { ...mockMethods }, sut)

      await sut.all()

      expect(mockMethods.find).toBeCalled()
      expect(mockMethods.skip).toBeCalled()
      expect(mockMethods.limit).toBeCalled()
      expect(mockMethods.skip).toBeCalledWith(0)
      expect(mockMethods.limit).toBeCalledWith(20)
    })

    test.each([
      ['name', { name: '_TESTNAME_' }, { name: '_TESTNAME_' }],
      ['email', { email: '_TESTEMAIL_' }, { email: '_TESTEMAIL_' }],
      ['name and email', { email: '_TESTEMAIL_', name: '_TESTNAME_' }, { email: '_TESTEMAIL_', name: '_TESTNAME_' }],
    ])('When filter(s) %s sent, then it should mount with the filter correctly', async (_, filter, expected) => {
      const sut = serviceContainer.getNamed<ContaPessoalRepo>(TYPES.IPersonalAccountRepo, 'PersonalAccount')
      const mockMethods = {
        find: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnValue(undefined),
      }
      Reflect.set(sut, 'model', { ...mockMethods }, sut)

      await sut.all(filter)

      expect(mockMethods.find).toBeCalled()
      expect(mockMethods.find).toBeCalledWith(expected)
    })
  })

})