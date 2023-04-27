import { CreateUserDto } from '../../model/CreateUserDto';
import { UserEntity } from '../../../../repository/user/entity/user.entity';

export class UserConverter {
  public convertCreateUserToEntity(userDto: CreateUserDto): UserEntity {
    return {
      id: null,
      email: userDto.email,
      login: userDto.login,
      password: userDto.password,
      isEmailVerified: false,
    };
  }
}