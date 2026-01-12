import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sum')
  async getSum(): Promise<number> {
    return this.appService.calculateSum([5, 10, 15]);
  }
  @Get('capitalize')
  async getCapitalize(): Promise<string> {
    return this.appService.capitalizeString('hello world');
  }
}
