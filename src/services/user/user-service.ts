import { type CreateUserRepository } from '../../repositories/user/create-user-repository'
import { type ReadUserByEmailRepository } from '../../repositories/user/read-user-repository'
import { type UpdateAccessTokenRepository } from '../../repositories/user/update-access-token-repository'
import { type BcryptAdapter } from '../../utils/adapters/bcrypt/bcrypt-adapter'
import { type AuthenticationModel, type Authentication } from '../../utils/protocols/authentication/authentication'
import { type Encrypter } from '../../utils/protocols/authentication/encrypter'
import { type AddUser } from '../../utils/protocols/user/add-user'
import { type User } from '../../utils/protocols/user/user'
import { type UserData } from '../../utils/protocols/user/user-data'

export class UserService implements AddUser, Authentication {
  constructor (
    private readonly createUserRepository: CreateUserRepository,
    private readonly readUserByEmailRepository: ReadUserByEmailRepository,
    private readonly hasher: BcryptAdapter,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async add (user: UserData): Promise<User> {
    const foundedUser = await this.readUserByEmailRepository.readByEmail(user.email)
    if (foundedUser) {
      return foundedUser
    }
    const hashedPassword = await this.hasher.hash(user.password)
    const createdUser = await this.createUserRepository.create({
      username: user.username,
      email: user.email,
      password: hashedPassword
    })
    return createdUser
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const user = await this.readUserByEmailRepository.readByEmail(authentication.email)
    if (user) {
      const isValid = await this.hasher.compare(authentication.password, user.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)
        await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
