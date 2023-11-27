export class ServerError extends Error {
  constructor (stack?: string) {
    super('Erro interno do servidor')
    this.stack = stack
    this.name = 'ServerError'
  }
}
