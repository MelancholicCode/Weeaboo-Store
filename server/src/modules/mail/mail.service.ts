import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  transporter = nodemailer.createTransport({
    host: this.configService.getOrThrow('SMTP_HOST'),
    port: this.configService.getOrThrow('SMTP_PORT'),
    secure: true,
    auth: {
      user: this.configService.getOrThrow('SMTP_USER'),
      pass: this.configService.getOrThrow('SMTP_PASSWORD'),
    },
  });

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow('SMTP_USER'),
      to,
      subject: `Activation of an account in the Weeaboo Store`,
      html: `
        <div>
          <h1>Click on the link to activate your account</h1>
          <a href="${link}">Go to the Weeaboo Store</a>
        </div>
      `,
    });
  }
}
