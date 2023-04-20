export class AppError extends Error {
  readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    super()

    this.name = 'AppError'
    this.message = message
    this.statusCode = statusCode
  }
}
