import { HttpException, HttpStatus } from '@nestjs/common';
import { INVALID_LOGIN_OR_PASSWORD } from '../../../messages/constants/message.constants';

export class BadCredentialsException extends HttpException {
  constructor() {
    super(INVALID_LOGIN_OR_PASSWORD, HttpStatus.FORBIDDEN);
  }
}