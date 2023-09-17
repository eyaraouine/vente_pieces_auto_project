import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { ProvidersModule } from './providers/providers.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MailingModule } from './mailing/mailing.module';
import * as dotenv from 'dotenv';
import { Cars } from './cars/entities/cars.entity';
import { Piece } from './piece/entities/piece.entity';
import { Providers } from './providers/entities/providers.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PieceModule } from './piece/piece.module';
import { Categories } from './categories/entities/categories.entity';

dotenv.config();

@Module({
  imports: [
    CarsModule,
    ProvidersModule,
    CategoriesModule,
    PieceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Cars, Piece, Providers,Categories],
      synchronize: true,
    }),
    MailingModule,
    MulterModule.register({
      dest: '../frontend/public',
}),
  ],

})
export class AppModule {}
