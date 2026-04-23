import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { IndexesDto } from './dto/indexes.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Рендер письма в браузере' })
  renderMail() {
    return this.appService.renderMail();
  }

  @Get('/report')
  @ApiOperation({ summary: 'Get email weight report' })
  getRepoert() {
    return this.appService.getEmailWeightReport();
  }

  @Post('mock/:email')
  @ApiOperation({ summary: 'Отправка письма с мокаными данными' })
  sendMailForMock(@Param('email') email: string) {
    return this.appService.sendTestMailForMock(email);
  }

  @Post(':email')
  @ApiOperation({ summary: 'Отправка письма с пользовательскими данными' })
  @ApiBody({
    type: IndexesDto,
    examples: {
      default: {
        summary: 'Тестовые данные индексов',
        value: {
          indexes: [
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
          ],
          eps: [
            {
              symbol: 'N225',
              name: 'Nikkei 225',
              actual: 5.94,
              estimate: 5.49,
              surprise: 0.45,
              previous: 5.23,
              isPositive: true,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
            },
            {
              symbol: 'N225',
              name: 'Nikkei 225',
              actual: 5.94,
              estimate: 5.49,
              surprise: 0.45,
              previous: 5.23,
              isPositive: false,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
            },
            {
              symbol: 'N225',
              name: 'Nikkei 225',
              actual: 5.94,
              estimate: 5.49,
              surprise: 0.45,
              previous: 5.23,
              isPositive: true,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
            },
            {
              symbol: 'N225',
              name: 'Nikkei 225',
              actual: 5.94,
              estimate: 5.49,
              surprise: 0.45,
              previous: 5.23,
              isPositive: false,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
            },
            {
              symbol: 'N225',
              name: 'Nikkei 225',
              actual: 5.94,
              estimate: 5.49,
              surprise: 0.45,
              previous: 5.23,
              isPositive: false,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
            },
          ],
          macro: [
            {
              name: 'Nikkei 225',
              actual: 5.94,
              forecast: 5.49,
              previous: 5.23,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
              time: '10:00',
              num: 1,
            },
            {
              name: 'Nikkei 225',
              actual: 5.94,
              forecast: 5.49,
              previous: 5.23,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
              time: '10:00',
              num: 3,
            },
            {
              name: 'Nikkei 225',
              actual: 5.94,
              forecast: 5.49,
              previous: 5.23,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
              time: '10:00',
              num: 1,
            },
            {
              name: 'Nikkei 225',
              actual: 5.94,
              forecast: 5.49,
              previous: 5.23,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
              time: '10:00',
              num: 2,
            },
            {
              name: 'Nikkei 225',
              actual: 5.94,
              forecast: 5.49,
              previous: 5.23,
              logo: 'https://www.shutterstock.com/image-photo/coca-cola-logo-on-vibrant-600nw-2524254995.jpg',
              time: '10:00',
              num: 3,
            },
          ],
          headline: 'Market data as of Apr 17, 2026 at 4:00 PM ET.',
        },
      },
    },
  })
  sendMail(@Param('email') email: string, @Body() dto: IndexesDto) {
    return this.appService.sendTestMail(email, dto);
  }
}
