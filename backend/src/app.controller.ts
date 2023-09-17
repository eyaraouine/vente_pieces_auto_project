import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MailingService } from './mailing/mailing.service';
import { Providers } from './providers/entities/providers.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: MailingService) {}

  @Get()
  getHello(): Promise<any> {
    return this.appService.sendUserConfirmation({
      id: "1",
      name: 'test',
      email: 'onsouahchi@gmail.com',
      phone: 'test',
      address: 'test',
      city: 'test',
      
    } as Providers);
  }
}

