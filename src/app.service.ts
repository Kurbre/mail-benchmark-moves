import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Data, renderFile } from 'ejs';
import juice from 'juice';
import { join } from 'path';
import process from 'process';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true для 465, false для других портов
      auth: {
        user: this.configService.getOrThrow<string>('SMTP_USER'),
        pass: this.configService.getOrThrow<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"Benchmark moves" <${this.configService.getOrThrow<string>('SMTP_USER')}>`,
      to,
      subject,
      html,
    });
  }

  async getTemplate<T extends Data>(templateName: string, data?: T) {
    const file = join(process.cwd(), 'src', 'mail', `${templateName}.ejs`);

    const template = await renderFile(file, data);

    return juice(template);
  }

  async renderMail() {
    return this.getTemplate('benchmarkMoveTable', {});
  }

  async sendTestMail(email: string) {
    const template = await this.getTemplate('benchmarkMoveTable', {});

    await this.sendMail(email, 'Benchmark moves', template);
  }
}
