import prisma from '../../db/connection/prisma-connection'
import { type UpdateAccessToken } from '../../utils/protocols/user/update-access-token'

export class UpdateAccessTokenRepository implements UpdateAccessToken {
  async updateAccessToken (id: number, token: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { token }
    })
  }
}
