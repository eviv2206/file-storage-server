import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  INVALID_EMAIL,
  INVALID_LOGIN_CHARS,
  INVALID_LOGIN_MAX_LENGTH,
  INVALID_LOGIN_MIN_LENGTH,
  INVALID_PASSWORD_CHARS,
  INVALID_PASSWORD_MAX_LENGTH,
  INVALID_PASSWORD_MIN_LENGTH,
} from '../../../messages/constants/message.constants';
import {
  CREDS_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './UserCredentials';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(CREDS_MIN_LENGTH, { message: INVALID_LOGIN_MIN_LENGTH })
  @MaxLength(LOGIN_MAX_LENGTH, { message: INVALID_LOGIN_MAX_LENGTH })
  @Matches(/^[a-z0-9_.]+$/, { message: INVALID_LOGIN_CHARS })
  login: string;

  @ApiProperty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(CREDS_MIN_LENGTH, { message: INVALID_PASSWORD_MIN_LENGTH })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: INVALID_PASSWORD_MAX_LENGTH })
  @Matches(/[\w\[\]`?!&/.,”']*/, { message: INVALID_PASSWORD_CHARS })
  password: string;
}
