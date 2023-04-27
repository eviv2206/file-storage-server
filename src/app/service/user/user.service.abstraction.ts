import { UserEntity } from '../../repository/user/entity/user.entity';

export abstract class IUserService {
  public abstract findByLogin(login: string): Promise<UserEntity>;

  public abstract findById(id: number): Promise<UserEntity>;

  public abstract createUser(user: UserEntity): Promise<UserEntity>;

  public abstract update(user: UserEntity): Promise<UserEntity>;

  public abstract findByEmail(email: string): Promise<UserEntity>;

}
