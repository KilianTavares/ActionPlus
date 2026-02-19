import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { loginDTO, signUpDTO } from './auth-dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginDto: loginDTO) {
    return this.authService.login(loginDto);
  }

  @MessagePattern({ cmd: 'signUp' })
  async signUp(@Payload() signUpDto: signUpDTO) {
    return this.authService.signUp(signUpDto);
  }
}
