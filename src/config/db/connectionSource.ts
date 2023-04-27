import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: +this.configService.get<string>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/config/db/migrations/**/*{.ts,.js}'],
      synchronize: false,
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      logging: true,
      insecureAuth: true,
    };
  }
}
