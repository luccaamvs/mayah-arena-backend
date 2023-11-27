import { type User } from '@prisma/client'

export interface ReadDbUser {
  readByEmail: (email: string) => Promise<User | null>
}
