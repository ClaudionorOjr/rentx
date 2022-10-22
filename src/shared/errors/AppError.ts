export class AppError {
  // readonly pois é um atributo somente para leitura
  public readonly message: string

  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}