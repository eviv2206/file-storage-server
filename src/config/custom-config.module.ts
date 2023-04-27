import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './db/connectionSource';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import * as process from 'process';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
      // eslint-disable-next-line @typescript-eslint/require-await
      async dataSourceFactory(options) {
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('SERVICE_MAILER'),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: configService.get<string>('SENDER_EMAIL'),
            pass: configService.get<string>('SENDER_PASSWORD'),
          },
        },
        defaults: {
          from: 'noreply@example.com',
        },
        template: {
          dir: process.cwd() + '/templates',
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class CustomConfigModule {}
