export class EmailInUseError extends Error {
  constructor () {
    super('Endereço de email já está em uso')
    this.name = 'EmailInUseName'
  }
}
