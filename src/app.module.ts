import { Module } from '@nestjs/common';
import { CustomConfigModule } from './config/custom-config.module';
import { HttpModule } from '@nestjs/axios';
import { ControllerModule } from './app/controller/controller.module';



@Module({
  imports: [
    CustomConfigModule,
    ControllerModule,
    HttpModule,
  ],
})
export class AppModule {
}
