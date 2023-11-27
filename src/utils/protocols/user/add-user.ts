import { type User } from './user'

export interface AddUser {
  add: (user: { email: string, password: string }) => Promise<User>
}
