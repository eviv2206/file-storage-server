import { Module } from '@nestjs/common';
import { IAuthenticationService } from './authentication/authentication.service.abstraction';
import { AuthenticationService } from './authentication/impl/authentication.service';
import { IUserService } from './user/user.service.abstraction';
import { UserService } from './user/impl/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../repository/user/entity/user.entity';
import { UserConverter } from './authentication/util/converters/user.converter';

@Module({
  // Delegates
  providers: [
    {
      provide: IAuthenticationService,
      useClass: AuthenticationService,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },

    // Converters
    UserConverter,
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [IUserService, IAuthenticationService],
})
export class ServiceModule {}
