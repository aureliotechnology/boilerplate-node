import { IValidator, ValidationError } from '@app/validator/IValidator'
import TYPES from '@crosscutting/Types'
import PersonalAccount from '@domain/account/entities/PersonalAccount'
import PersonalAccountSrv from '@domain/account/services/PersonalAccountSrv'
import { IUseCase } from '@modules/ddd-hex-ca-module/src'
import { inject, injectable, named } from 'inversify'
import { IsString } from 'class-validator'

export class CreatePersonalAccountReqUC {
  @IsString()
  name: string
  @IsString()
  email: string
  @IsString()
  birthdate: string
}

@injectable()
export default class CreatePersonalAccountUC implements IUseCase<CreatePersonalAccountReqUC, PersonalAccount | ValidationError[]> {
  public constructor(
    @inject(TYPES.PersonalAccountSrv) private readonly personalAccountSrv: PersonalAccountSrv,
    @inject(TYPES.IValidator) @named('CreatePersonalAccountUCValidator') private validator: IValidator,
  ) { }

  async execute(input: CreatePersonalAccountReqUC): Promise<PersonalAccount | ValidationError[]> {
    const validationResult = this.validator.validate(input)
    if (validationResult?.errors) return validationResult

    const birthdate = new Date(input.birthdate)
    return this.personalAccountSrv.create(input.name, input.email, birthdate)
  }
}
