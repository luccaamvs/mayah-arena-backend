import jwt from 'jsonwebtoken'
import { type Encrypter } from '../../protocols/authentication/encrypter'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: number): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret, {
      expiresIn: '1d'
    })
    return accessToken
  }
}
