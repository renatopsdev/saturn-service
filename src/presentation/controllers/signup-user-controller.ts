import { UserDto } from '../dtos/user.dto'
import { MissingMandatoryParamError } from '../errors/missing-mandatory-param-error'
import { badRequest } from '../http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpResponse } from '../protocols/http'
export class SignUpUserController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  handle (userDto: UserDto): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!userDto[field]) {
        return badRequest(new MissingMandatoryParamError(field))
      }
    }

    this.emailValidator.isValid(userDto.email)
  }
}
