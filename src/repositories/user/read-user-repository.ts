import { type User } from '@prisma/client'
import { type ReadDbUser } from '../../utils/protocols/user/read-db-user'
import prisma from '../../db/connection/prisma-connection'

export class ReadUserByEmailRepository implements ReadDbUser {
  async readByEmail (email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
