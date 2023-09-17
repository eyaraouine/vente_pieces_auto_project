import { Module, forwardRef } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './entities/providers.entity';
import { ProvidersService } from './providers.service';
import { MailingModule } from '../mailing/mailing.module';
import { AuthModule } from '../auth/auth.module';
import { Piece } from '../piece/entities/piece.entity';

@Module({
  imports:[TypeOrmModule.forFeature(
    [Providers,Piece]
    ),
MailingModule, AuthModule],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports:[ProvidersService]
})
export class ProvidersModule {}
