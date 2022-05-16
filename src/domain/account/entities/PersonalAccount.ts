import { DomainException } from '@modules/ddd-hex-ca-module/src'
import AccountType from '../enums/AccountType'
import PersonalAccountStatus from '../enums/PersonalAccountStatus'
import Account from './Account'

export default class PersonalAccount extends Account {
  name: string
  email: string
  birthdate: Date
  status: PersonalAccountStatus
  constructor() {
    super(AccountType.PERSONAL)
  }

  static create(name: string, email: string, birthdate: Date): PersonalAccount {
    if (name === '') throw new DomainException('PERSONAL_ACCOUNT_CREATION_ERROR', 'Field "name" cannot be empty')
    if (email === '') throw new DomainException('PERSONAL_ACCOUNT_CREATION_ERROR', 'Field "email" cannot be empty')

    const personalAccount = new PersonalAccount()
    personalAccount.name = name
    personalAccount.email = email
    personalAccount.birthdate = birthdate
    personalAccount.status = PersonalAccountStatus.PENDING
    return personalAccount
  }

  changeEmail(email: string) {
    this.email = email
  }

  changeName(name: string) {
    this.name = name
  }

  private isPossibleStatusTransition(toStatus: PersonalAccountStatus): boolean {
    const transition: Map<PersonalAccountStatus, PersonalAccountStatus[]> = new Map([
      [PersonalAccountStatus.ACTIVE, [PersonalAccountStatus.BLOCKED, PersonalAccountStatus.DELETED, PersonalAccountStatus.PENDING],],
      [PersonalAccountStatus.BLOCKED, [PersonalAccountStatus.ACTIVE]],
      [PersonalAccountStatus.PENDING, [PersonalAccountStatus.ACTIVE]],
      [PersonalAccountStatus.DELETED, [PersonalAccountStatus.ACTIVE, PersonalAccountStatus.BLOCKED]],
    ])

    const transitionStatus = transition.get(toStatus)

    if (!transitionStatus) return false

    return transitionStatus.includes(this.status)
  }

  public toActive(): void {
    if (!this.isPossibleStatusTransition(PersonalAccountStatus.ACTIVE))
      throw new DomainException('TRANSITION_NOT_AUTHORIZATE', 'Transition status not authorizate')

    this.status = PersonalAccountStatus.ACTIVE
  }

  public toBlocked(): void {
    if (!this.isPossibleStatusTransition(PersonalAccountStatus.BLOCKED))
      throw new DomainException('TRANSITION_NOT_AUTHORIZATE', 'Transition status not authorizate')

    this.status = PersonalAccountStatus.BLOCKED
  }

  public toPending(): void {
    if (!this.isPossibleStatusTransition(PersonalAccountStatus.PENDING))
      throw new DomainException('TRANSITION_NOT_AUTHORIZATE', 'Transition status not authorizate')

    this.status = PersonalAccountStatus.PENDING
  }

  public toDelete(): void {
    if (!this.isPossibleStatusTransition(PersonalAccountStatus.DELETED))
      throw new DomainException('TRANSITION_NOT_AUTHORIZATE', 'Transition status not authorizate')

    this.status = PersonalAccountStatus.DELETED
  }


}