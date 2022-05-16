import Entity from '@domain/account/entities/PersonalAccount'
import PersonalAccountStatus from '@domain/account/enums/PersonalAccountStatus'
import { DomainException } from '@modules/ddd-hex-ca-module/src'
import faker from 'faker'

describe('PersonalAccount Entity', () => {
  test('When empty name sent, then it should throw a DomainException', () => {
    expect.assertions(1)
    try {
      Entity.create('', faker.internet.email(), new Date())
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException)
    }
  })
  test('When empty name sent, then it should throw a DomainException', () => {
    expect.assertions(1)
    expect(() => Entity.create('', faker.internet.email(), new Date())).toThrow(DomainException)
  })
  test('When empty email sent, then it should throw a DomainException', () => {
    expect.assertions(1)
    try {
      Entity.create(faker.name.firstName(), '', new Date())
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException)
    }
  })
  test('When changeName method used, then the new name should be in the state', () => {
    const sut = Entity.create(faker.name.firstName(), faker.internet.email(), new Date())
    const expected = faker.name.firstName()
    sut.changeName(expected)
    expect(sut.name).toBe(expected)
  })

  test('When changeEmail method used, then the new email should be in the state', () => {
    const sut = Entity.create(faker.name.firstName(), faker.internet.email(), new Date())
    const expected = faker.internet.email()
    sut.changeEmail(expected)
    expect(sut.email).toBe(expected)
  })

  test('When toActive method used', () => {
    const sut = Entity.create(faker.name.firstName(), faker.internet.email(), new Date())
    sut.toActive()
    expect(sut.status).toBe(PersonalAccountStatus.ACTIVE)
  })
  test('When toBlocked method used', () => {
    const sut = Entity.create(faker.name.firstName(), faker.internet.email(), new Date())
    sut.toActive()
    sut.toBlocked()
    expect(sut.status).toBe(PersonalAccountStatus.BLOCKED)
  })
  test('When toPending method used', () => {
    const sut = Entity.create(faker.name.firstName(), faker.internet.email(), new Date())
    sut.toActive()
    sut.toPending()
    expect(sut.status).toBe(PersonalAccountStatus.PENDING)
  })
  test('When toDelete method used', () => {
    const sut = Entity.create(faker.name.firstName(), faker.internet.email(), new Date())
    sut.toActive()
    sut.toDelete()
    expect(sut.status).toBe(PersonalAccountStatus.DELETED)
  })
})
