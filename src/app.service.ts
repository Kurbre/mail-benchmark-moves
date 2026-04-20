import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Data, renderFile } from 'ejs';
import juice from 'juice';
import { join } from 'path';
import process from 'process';
import * as nodemailer from 'nodemailer';
import { Index } from './dto/indexes.dto';

@Injectable()
export class AppService {
  private transporter;
  private indexes = [
    {
      symbol: 'N225',
      name: 'Nikkei 225',
      price: '58,475.90',
      change: '-1,042.22',
      percent: '-1.78%',
      logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
      isPositive: false,
    },
    {
      symbol: 'S&P 500',
      name: "Standard & Poor's",
      price: '5,123.45',
      change: '+12.30',
      percent: '+0.24%',
      logo: 'https://static.vecteezy.com/system/resources/previews/007/978/618/non_2x/pepsi-popular-drink-brand-logo-vinnytsia-ukraine-may-16-202-free-vector.jpg',
      isPositive: true,
    },
    {
      symbol: 'N225',
      name: 'Nikkei 225',
      price: '58,475.90',
      change: '-1,042.22',
      percent: '-1.78%',
      logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
      isPositive: false,
    },
    {
      symbol: 'S&P 500',
      name: "Standard & Poor's",
      price: '5,123.45',
      change: '+12.30',
      percent: '+0.24%',
      logo: 'https://static.vecteezy.com/system/resources/previews/007/978/618/non_2x/pepsi-popular-drink-brand-logo-vinnytsia-ukraine-may-16-202-free-vector.jpg',
      isPositive: true,
    },
    {
      symbol: 'Toyota',
      name: 'Toyota prius',
      price: '15,123.45',
      change: '+32.30',
      percent: '+2.24%',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZShoVBhCZoflB-I35i_BsVH9Lexeanbbq2Q&s',
      isPositive: true,
    },
  ];

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
    const htmlWithStyles = juice(template);

    const sizeInBytes = Buffer.byteLength(htmlWithStyles, 'utf8');
    const sizeInKb = sizeInBytes / 1024;

    console.log(sizeInKb);

    return juice(htmlWithStyles);
  }

  async renderMail() {
    const indexes = this.indexes;

    return this.getTemplate('benchmarkMoveTable', { indexes });
  }

  async sendTestMailForMock(email: string) {
    const indexes = this.indexes;
    const template = await this.getTemplate('benchmarkMoveTable', { indexes });

    await this.sendMail(email, 'Benchmark moves', template);
  }

  async sendTestMail(email: string, indexes: Index[]) {
    const template = await this.getTemplate('benchmarkMoveTable', { indexes });

    await this.sendMail(email, 'Benchmark moves', template);
  }

  async getEmailWeightReport() {
    const file = join(process.cwd(), 'src', 'mail', `benchmarkMoveTable.ejs`);

    const rawHtml = await renderFile(file, this.indexes);

    const finalHtml = juice(rawHtml);

    const totalBytes = Buffer.byteLength(finalHtml, 'utf8');
    const cssInlinedBytes = totalBytes - Buffer.byteLength(rawHtml, 'utf8');

    const textOnly = finalHtml.replace(/<[^>]*>/g, '');
    const textBytes = Buffer.byteLength(textOnly, 'utf8');

    const structureBytes = totalBytes - textBytes;

    return {
      total: (totalBytes / 1024).toFixed(2) + ' KB',
      breakdown: {
        htmlStructure: (structureBytes / 1024).toFixed(2) + ' KB',
        textContent: (textBytes / 1024).toFixed(2) + ' KB',
        cssInlined:
          (cssInlinedBytes > 0 ? (cssInlinedBytes / 1024).toFixed(2) : 0) +
          ' KB',
      },
      isWarning: totalBytes > 102 * 1024,
    };
  }
}
