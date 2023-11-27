import { type Controller } from '../../../controllers/protocols/controller-protocol'
import { SignupController } from '../../../controllers/signup/signup-controller'
import { EmailValidator } from '../../validations/validateEmail'
import { makeUserService } from '../services/user-service-factory'

export const makeSignupController = (): Controller => {
  return new SignupController(new EmailValidator(), makeUserService())
}
