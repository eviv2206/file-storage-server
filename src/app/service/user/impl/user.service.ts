import { Injectable } from '@nestjs/common';
import { IUserService } from '../user.service.abstraction';
import { UserEntity } from '../../../repository/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../../authentication/exception/user-not-found.exception';


@Injectable()
export class UserService implements IUserService {
  @InjectRepository(UserEntity)
  private usersRepository: Repository<UserEntity>;

  public findByLogin(login: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ login });
  }

  public findById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  public async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  public async update(user: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  public async deleteUser(user: UserEntity): Promise<void> {
    const deleteResult = await this.usersRepository.delete(user);
    if (deleteResult.affected === 0) {
      throw new UserNotFoundException();
    }
  }

}
