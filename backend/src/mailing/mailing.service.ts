import { Injectable, Provider } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Providers } from 'src/providers/entities/providers.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService,  private jwtService: JwtService,) {
  }

  async sendUserConfirmation(user: Providers, token?: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Votre compte est désormais activé',
      template: './confirmation', 
      context: { 
        name: user.name,
        url: 'http://localhost:3000/register?token=' + token,
      },
    });
  }

  async sendUserDeactivation(user: Providers) {
    console.log(user.email);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Votre compte est désormais bloqué',
      template: './blocked',
      context: {
        name: user.name
      },
    });
  }
}