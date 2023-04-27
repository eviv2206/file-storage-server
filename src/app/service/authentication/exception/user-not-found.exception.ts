import { USER_NOT_FOUND } from '../../../messages/constants/message.constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}