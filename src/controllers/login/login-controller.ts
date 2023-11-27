import { type UserService } from '../../services/user/user-service'
import { InvalidParamError } from '../../utils/errors'
import { badRequest, ok, serverError, unauthorized } from '../../utils/helpers/http-helper'
import { type Controller } from '../protocols/controller-protocol'
import { type HttpResponse, type HttpRequest } from '../protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly userService: UserService
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new InvalidParamError(field))
        }
      }

      const { email, password } = httpRequest.body
      const accessToken = await this.userService.auth({
        email,
        password
      })

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
