import { LoginController } from '../../../controllers/login/login-controller'
import { type Controller } from '../../../controllers/protocols/controller-protocol'
import { makeUserService } from '../services/user-service-factory'

export const makeLoginController = (): Controller => {
  return new LoginController(makeUserService())
}
