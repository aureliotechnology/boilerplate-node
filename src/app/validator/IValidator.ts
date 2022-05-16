export type ErrorMessage = {
  code: string
  message: string
}

export type ValidationError = {
  errors: ErrorMessage[] | undefined
}

export interface IValidator {
  validate(input: any): any
}