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
import { UserDuplicateException } from '../exception/user-duplicate.exception';
import { InvalidTokenException } from '../exception/invalid-token.exception';
import { BadCredentialsException } from '../exception/bad-credentials.exception';

const NUM_OF_HASH_ROUNDS = 12;
const EMAIL = 'Почта';
const LOGIN = 'Логин';
const SUBJECT_LETTER = 'Подтверждение почты';

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
      throw new UserDuplicateException(EMAIL);
    }
    if (await this.userService.findByLogin(createUser.login)) {
      throw new UserDuplicateException(LOGIN);
    }
    const userEntityPartly = this.userConverter.convertCreateUserToEntity(createUser);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    userEntityPartly.password = await bcrypt.hash(userEntityPartly.password, NUM_OF_HASH_ROUNDS);
    const user = await this.userService.createUser(userEntityPartly);
    const token = await this.jwtService.signAsync({ userId: user.id });
    await this.sendEmail(token, user.email);
  }

  public async confirmEmail(token: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET_KEY });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const userToSave = await this.userService.findById(decoded.userId);
      userToSave.isEmailVerified = true;
      await this.userService.update(userToSave);
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
  
  public async resendEmail(credentials: UserCredentials): Promise<void> {
    const jwtToken = await this.signIn(credentials);
    const userEntity = await this.userService.findByLogin(credentials.login);
    await this.sendEmail(jwtToken.accessToken, userEntity.email);
  }

  public async deleteUser(credentials: UserCredentials): Promise<void> {
    const userEntity = await this.userService.findByLogin(credentials.login);
    if (await this.isPasswordMatching(credentials, userEntity)) {
      await this.userService.deleteUser(userEntity);
    } else {
      throw new BadCredentialsException();
    }
  }

  private async areCredentialsInvalid(credentials: UserCredentials, user: UserEntity): Promise<boolean> {
    return !user || user.login !== credentials.login || ! await this.isPasswordMatching(credentials, user);
  }

  private async isPasswordMatching(credentials: UserCredentials, user: UserEntity): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return await bcrypt.compare(credentials.password, user.password);
  }

  private async sendEmail(token: string, emailReceiver: string): Promise<void> {
    const confirmationUrl = process.env.CONFIRMATION_LINK + token;
    await this.mailerService.sendMail({
      to: emailReceiver,
      from: process.env.SENDER_EMAIL,
      subject: SUBJECT_LETTER,
      template: process.cwd() + '/templates/' + 'confirm-email.pug',
      context: {
        confirmationUrl,
      },
    });
  }
  
}
