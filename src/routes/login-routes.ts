import { type Router } from 'express'
import { adaptRoute } from '../utils/adapters/express/express-route-adapter'
import { makeSignupController } from '../utils/factories/controllers/signup-controller-factory'
import { makeLoginController } from '../utils/factories/controllers/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
