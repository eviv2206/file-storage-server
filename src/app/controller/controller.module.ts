import { Module } from '@nestjs/common';
import { AuthenticationController } from './api/authentication/authentication.controller';
import { JwtStrategy } from './security/strategy/jwt.strategy';
import { ServiceModule } from '../service/service.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';


@Module({
  imports: [
    ServiceModule,
      NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy],
})
export class ControllerModule {}
