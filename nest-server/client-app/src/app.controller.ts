import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { loginDTO, signUpDTO } from './dto/auth-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async loginUser(@Body() loginDto: loginDTO): Promise<any> {
    return this.appService.loginUser(loginDto);
  }
  @Post('signUp')
  async signupUser(@Body() signUpDTO: signUpDTO): Promise<any> {
    return this.appService.signUpUser(signUpDTO);
  }

  @Get('profile')
  async getUserProfile(@Query('userId') userId: string): Promise<any> {
    return this.appService.getUserProfile(userId);
  }
}
