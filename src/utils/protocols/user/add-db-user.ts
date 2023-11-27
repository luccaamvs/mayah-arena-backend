import { type User } from '@prisma/client'
import { type UserData } from './user-data'

export interface AddDbUser {
  create: (user: UserData) => Promise<User>
}
