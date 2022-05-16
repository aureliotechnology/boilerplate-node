import { IValidator, ValidationError } from '@app/validator/IValidator'
import Joi from 'joi'
import { injectable } from 'inversify'

@injectable()
class CreatePersonalAccountUCValidator implements IValidator {
  schema: Joi.ObjectSchema<any>
  constructor() {
    this.schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      birthdate: Joi.date().required()
    })
  }
  validate(input: any): ValidationError {
    const resultValidation = this.schema.validate(input, { abortEarly: false })
    const errors = resultValidation.error?.details.map(error => ({
      code: 'INVALID_PARAMS',
      message: error.message
    }))

    return { errors }
  }

}



export default CreatePersonalAccountUCValidator
