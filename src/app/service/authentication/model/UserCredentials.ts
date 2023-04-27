import {
  MaxLength,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  INVALID_LOGIN_CHARS,
  INVALID_LOGIN_MAX_LENGTH,
  INVALID_LOGIN_MIN_LENGTH,
  INVALID_PASSWORD_CHARS,
  INVALID_PASSWORD_MAX_LENGTH,
  INVALID_PASSWORD_MIN_LENGTH,
} from '../../../messages/constants/message.constants';

export const CREDS_MIN_LENGTH = 4;
export const LOGIN_MAX_LENGTH = 35;
export const PASSWORD_MAX_LENGTH = 15;

export class UserCredentials {
  @ApiProperty()
  @IsString()
  @MinLength(CREDS_MIN_LENGTH, { message: INVALID_LOGIN_MIN_LENGTH })
  @MaxLength(LOGIN_MAX_LENGTH, { message: INVALID_LOGIN_MAX_LENGTH })
  @Matches(/^[a-z0-9_.]+$/, { message: INVALID_LOGIN_CHARS })
  login: string;

  @ApiProperty()
  @IsString()
  @MinLength(CREDS_MIN_LENGTH, { message: INVALID_PASSWORD_MIN_LENGTH })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: INVALID_PASSWORD_MAX_LENGTH })
  @Matches(/[\w\[\]`?!&/.,”']*/, { message: INVALID_PASSWORD_CHARS })
  password: string;
}
