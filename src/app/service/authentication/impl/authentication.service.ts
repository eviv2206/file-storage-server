import { IAuthenticationService } from '../authentication.service.abstraction';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentials } from '../model/UserCredentials';
import { JwtToken } from '../model/JwtToken';
import { UserEntity } from '../../../repository/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../../user/user.service.abstraction';
import { UserInfo } from '../model/UserInfo';
import * as bcrypt from 'bcrypt';
import { INVALID_LOGIN_OR_PASSWORD } from '../../../messages/constants/message.constants';
import { CreateUserDto } from '../model/CreateUserDto';
import { UserConverter } from '../util/converters/user.converter';
import { MailerService } from '@nestjs-modules/mailer';
import * as process from 'process';

const NUM_OF_HASH_ROUNDS = 12;

@Injectable()
export class AuthenticationService implements IAuthenticationService {

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private userService: IUserService;

  @Inject()
  private userConverter: UserConverter;

  @Inject()
  private mailerService: MailerService;

  public async signIn(credentials: UserCredentials): Promise<JwtToken> {
    const user = await this.getUser(credentials);
    const payload = { username: user.login, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async getUser(credentials: UserCredentials): Promise<UserEntity> {
    const user = await this.userService.findByLogin(credentials.login);
    const isUserValid = await this.areCredentialsInvalid(credentials, user);
    if (isUserValid) {
      throw new UnauthorizedException(INVALID_LOGIN_OR_PASSWORD);
    }
    return user;
  }

  public async getUserById(id: number): Promise<UserInfo> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, username: user.login };
  }

  public async register(createUser: CreateUserDto): Promise<void> {
    if (await this.userService.findByEmail(createUser.email)) {
      throw new Error('User already exists');
    }
    const userEntityPartly = this.userConverter.convertCreateUserToEntity(createUser);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    userEntityPartly.password = await bcrypt.hash(userEntityPartly.password, NUM_OF_HASH_ROUNDS);
    const user = await this.userService.createUser(userEntityPartly);
    const token = await this.jwtService.signAsync({ sub: user.id });
    const confirmationUrl = `http://localhost:8080/api/v1/auth/confirm-email?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email, // list of receivers
      from: 'evgeniy.saprin@mail.com', // sender address
      subject: 'Подтверждение почты', // Subject line
      template: process.cwd() + '/templates/' + 'confirm-email.pug',
      context: {
        confirmationUrl,
      },
    });
  }

  public async confirmEmail(token: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const userToSave = await this.userService.findById(decoded.sub);
      userToSave.isEmailVerified = true;
      const user = await this.userService.update(userToSave);
      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private async areCredentialsInvalid(credentials: UserCredentials, user: UserEntity): Promise<boolean> {
    return !user || user.login !== credentials.login || ! await this.isPasswordMatching(credentials, user);
  }

  private async isPasswordMatching(credentials: UserCredentials, user: UserEntity): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return await bcrypt.compare(credentials.password, user.password);
  }


}
