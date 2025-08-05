import { HttpException as NestHttpException } from '@nestjs/common'

export class HttpException extends NestHttpException {
  constructor(error: any, message?: string) {
    super(
      error?.response?.message || message || 'An unexpecred error occurred',
      error?.status || 500,
    )
  }
}
