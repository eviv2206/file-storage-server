import { INVALID_TOKEN } from '../../../messages/constants/message.constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    super(INVALID_TOKEN, HttpStatus.FORBIDDEN);
  }
}