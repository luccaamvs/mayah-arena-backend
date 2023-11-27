import env from '../../../config/env'
import { CreateUserRepository } from '../../../repositories/user/create-user-repository'
import { ReadUserByEmailRepository } from '../../../repositories/user/read-user-repository'
import { UpdateAccessTokenRepository } from '../../../repositories/user/update-access-token-repository'
import { UserService } from '../../../services/user/user-service'
import { BcryptAdapter } from '../../adapters/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../adapters/jwt/jwt-adapter'

export const makeUserService = (): UserService => {
  const salt = 12
  const createUserRepository = new CreateUserRepository()
  const readUserByEmailRepository = new ReadUserByEmailRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const updateAccessTokenRepository = new UpdateAccessTokenRepository()
  return new UserService(
    createUserRepository,
    readUserByEmailRepository,
    bcryptAdapter,
    jwtAdapter,
    updateAccessTokenRepository
  )
}
