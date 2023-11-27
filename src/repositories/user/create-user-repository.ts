import { type User } from '@prisma/client'
import { type AddDbUser } from '../../utils/protocols/user/add-db-user'
import prisma from '../../db/connection/prisma-connection'
import { type UserData } from '../../utils/protocols/user/user-data'

export class CreateUserRepository implements AddDbUser {
  async create (user: UserData): Promise<User> {
    return await prisma.user.create({
      data: user
    })
  }
}
