import { type Controller } from '../protocols/controller-protocol'
import { type HttpResponse, type HttpRequest } from '../protocols/http'
import { type UserService } from '../../services/user/user-service'
import { badRequest, ok, serverError } from '../../utils/helpers/http-helper'
import { type EmailValidator } from '../../utils/validations/validateEmail'
import { EmailInUseError, InvalidParamError } from '../../utils/errors'

export class SignupController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly userService: UserService
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['username','password','email','passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new InvalidParamError(field))
        }
      }
      const { email, username, password, passwordConfirm } = httpRequest.body
      const isValid = this.emailValidator.validate(email)
      if (!isValid) {
        return badRequest(new EmailInUseError())
      }
      if (password !== passwordConfirm) {
        return badRequest(new Error('Confirmação de senha inválida'))
      }
      const user = await this.userService.add({
        username, password, email
      })
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
