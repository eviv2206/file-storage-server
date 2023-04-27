import { Body, Controller, Delete, Get, Inject, Post, Query, ValidationPipe } from '@nestjs/common';
import { IAuthenticationService } from '../../../service/authentication/authentication.service.abstraction';
import { UserCredentials } from '../../../service/authentication/model/UserCredentials';
import { JwtToken } from '../../../service/authentication/model/JwtToken';
import { CreateUserDto } from '../../../service/authentication/model/CreateUserDto';

@Controller('auth')
export class AuthenticationController {
  @Inject()
  private authenticationService: IAuthenticationService;

  @Post('login')
  async login(@Body(new ValidationPipe()) credentials: UserCredentials): Promise<JwtToken> {
    return this.authenticationService.signIn(credentials);
  }

  @Post('sign-up')
  async signUp(@Body(new ValidationPipe()) createUser: CreateUserDto): Promise<void> {
    await this.authenticationService.register(createUser);
  }

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string): Promise<void> {
    await this.authenticationService.confirmEmail(token);
  }

  @Get('resend-email')
  async resendEmail(@Body(new ValidationPipe()) credentials: UserCredentials): Promise<void> {
    await this.authenticationService.resendEmail(credentials);
  }

  @Delete('delete-user')
  async delete(@Body(new ValidationPipe()) credentials: UserCredentials): Promise<void> {
    await this.authenticationService.deleteUser(credentials);
  }
}
