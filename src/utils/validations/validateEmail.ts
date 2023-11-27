import { type Validation } from '../protocols/validators/validation'

export class EmailValidator implements Validation {
  validate (input: any): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(input)
  }
}
