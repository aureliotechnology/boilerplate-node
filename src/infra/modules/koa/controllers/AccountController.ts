import CreatePersonalAccountUC, { CreatePersonalAccountReqUC } from '@app/account/CreatePersonalAccountUC'
import GetPersonalAccountByIdUC from '@app/account/GetPersonalAccountByIdUC'
import { ValidationError } from '@app/validator/IValidator'
import TYPES from '@crosscutting/Types'
import PersonalAccount from '@domain/account/entities/PersonalAccount'
import { inject, injectable } from 'inversify'
import { Body, Get, JsonController, Param, Post, Res } from 'routing-controllers'

import BaseController from './BaseController'
@injectable()
@JsonController('/accounts')
export default class AccountController extends BaseController {
  constructor(
    @inject(TYPES.CreatePersonalAccountUC) private readonly createPersonalAccountUC: CreatePersonalAccountUC,
    @inject(TYPES.GetPersonalAccountByIdUC) private readonly getPersonalAccountByIdUC: GetPersonalAccountByIdUC
  ) {
    super()
  }

  @Get('/:personalAccountId')
  async get(@Param('personalAccountId') personalAccountId: string): Promise<PersonalAccount> {
    return this.getPersonalAccountByIdUC.execute(personalAccountId)
  }

  @Post('/')
  async create(@Body() input: CreatePersonalAccountReqUC, @Res() response: any): Promise<PersonalAccount | ValidationError[]> {
    const result: any = await this.createPersonalAccountUC.execute(input)
    return this.response(response, result)
  }
}