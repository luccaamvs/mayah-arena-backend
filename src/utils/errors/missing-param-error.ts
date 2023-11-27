export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Parametro ausente: ${paramName}`)
    this.name = 'MissingParamName'
  }
}
