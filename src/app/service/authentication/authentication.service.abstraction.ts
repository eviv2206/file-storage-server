import { UserInfo } from './model/UserInfo';
import { UserCredentials } from './model/UserCredentials';
import { UserEntity } from '../../repository/user/entity/user.entity';
import { JwtToken } from './model/JwtToken';
import { CreateUserDto } from './model/CreateUserDto';

export abstract class IAuthenticationService {
  abstract getUser(credentials: UserCredentials): Promise<UserEntity>;

  abstract signIn(credentials: UserCredentials): Promise<JwtToken>;

  abstract getUserById(id: number): Promise<UserInfo>;

  abstract register(user: CreateUserDto): Promise<void>;

  abstract confirmEmail(token: string): Promise<void>;

  abstract resendEmail(credentials: UserCredentials): Promise<void>;

  abstract deleteUser(credetials: UserCredentials): Promise<void>;
}
