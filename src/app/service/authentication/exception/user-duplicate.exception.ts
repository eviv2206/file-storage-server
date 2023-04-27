import { DUPLICATE_USER } from '../../../messages/constants/message.constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDuplicateException extends HttpException {
  constructor(field: string) {
    super(DUPLICATE_USER
      .replace('$FIELD', field), HttpStatus.CONFLICT
    );
  }
}